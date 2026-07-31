#!/usr/bin/env python3
"""
EC2 EXTERNAL ingress data in GB, per instance, grouped by month.

"External" = inbound traffic whose SOURCE address is NOT internal:
  - RFC 1918 private:  10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
  - loopback:          127.0.0.0/8
  - link-local:        169.254.0.0/16
  - CGNAT (shared):    100.64.0.0/10

The instance-level CloudWatch NetworkIn metric can't do this (no source IP),
so this reads VPC Flow Logs via CloudWatch Logs Insights and filters on srcAddr.
ENIs are mapped back to their EC2 instance so the report is per-instance.

Requirements:
  - VPC Flow Logs delivered to a CloudWatch Logs group (default format is fine;
    must include srcaddr, bytes, flow-direction, interface-id).
  - boto3 creds: logs:StartQuery/GetQueryResults, ec2:DescribeNetworkInterfaces.

Usage:
  python ec2_external_ingress_by_month.py --log-group /vpc/flowlogs --months 6 \
      [--instance i-0abc i-0def] [--region us-east-1]
"""

import argparse
import calendar
import time
from collections import defaultdict
from datetime import datetime, timezone

import boto3

GB = 1024 ** 3

# Source ranges treated as internal/local and excluded from "external" ingress.
INTERNAL_CIDRS = [
    "10.0.0.0/8",
    "172.16.0.0/12",
    "192.168.0.0/16",
    "127.0.0.0/8",
    "169.254.0.0/16",
    "100.64.0.0/10",
]


def month_windows(months_back):
    now = datetime.now(timezone.utc)
    y, m = now.year, now.month
    seq = []
    for _ in range(months_back):
        start = datetime(y, m, 1, tzinfo=timezone.utc)
        last_day = calendar.monthrange(y, m)[1]
        end = min(datetime(y, m, last_day, 23, 59, 59, tzinfo=timezone.utc), now)
        seq.append((f"{y:04d}-{m:02d}", start, end))
        m -= 1
        if m == 0:
            m, y = 12, y - 1
    return list(reversed(seq))


def build_query():
    """Ingress bytes per ENI, excluding internal source addresses."""
    not_internal = " and ".join(
        f"not isIpv4InSubnet(srcAddr, '{c}')" for c in INTERNAL_CIDRS
    )
    return (
        "fields interfaceId, srcAddr, bytes\n"
        "| filter flowDirection = 'ingress'\n"
        f"| filter {not_internal}\n"
        "| stats sum(bytes) as total_bytes by interfaceId"
    )


def run_query(client, log_group, query, start, end):
    qid = client.start_query(
        logGroupName=log_group,
        startTime=int(start.timestamp()),
        endTime=int(end.timestamp()),
        queryString=query,
        limit=10000,
    )["queryId"]
    while True:
        resp = client.get_query_results(queryId=qid)
        status = resp["status"]
        if status == "Complete":
            return resp["results"]
        if status in ("Failed", "Cancelled", "Timeout"):
            raise RuntimeError(f"Insights query {status}")
        time.sleep(1)


def eni_to_instance_map(ec2):
    """interfaceId -> instanceId ('-' if the ENI isn't attached to an instance)."""
    mapping = {}
    for page in ec2.get_paginator("describe_network_interfaces").paginate():
        for eni in page["NetworkInterfaces"]:
            iid = eni.get("Attachment", {}).get("InstanceId", "-")
            mapping[eni["NetworkInterfaceId"]] = iid
    return mapping


def main():
    ap = argparse.ArgumentParser(description="EC2 external ingress (GB) per instance by month")
    ap.add_argument("--log-group", required=True, help="VPC Flow Logs CloudWatch Logs group")
    ap.add_argument("--instance", nargs="*", help="Filter to these instance id(s)")
    ap.add_argument("--months", type=int, default=6, help="Months to look back (default 6)")
    ap.add_argument("--region", default=None)
    args = ap.parse_args()

    logs = boto3.client("logs", region_name=args.region)
    ec2 = boto3.client("ec2", region_name=args.region)

    eni_map = eni_to_instance_map(ec2)
    query = build_query()
    windows = month_windows(args.months)

    # month -> instance -> GB
    table = defaultdict(lambda: defaultdict(float))
    instances = set()

    for label, start, end in windows:
        for row in run_query(logs, args.log_group, query, start, end):
            d = {f["field"]: f["value"] for f in row}
            eni = d.get("interfaceId", "?")
            iid = eni_map.get(eni, eni)  # fall back to ENI id if unmapped
            if args.instance and iid not in args.instance:
                continue
            table[label][iid] += float(d.get("total_bytes", 0)) / GB
            instances.add(iid)

    if not instances:
        print("No external ingress flow-log records found for the window.")
        return

    instances = sorted(instances)
    print("EC2 EXTERNAL ingress (RFC1918/local excluded) in GB, by month\n")
    header = f"{'month':<9}" + "".join(f"{i:>22}" for i in instances) + f"{'TOTAL':>14}"
    print(header)
    print("-" * len(header))
    for label, _, _ in windows:
        line = f"{label:<9}"
        row_total = 0.0
        for iid in instances:
            gb = table[label].get(iid, 0.0)
            row_total += gb
            line += f"{gb:>22.3f}"
        line += f"{row_total:>14.3f}"
        print(line)


if __name__ == "__main__":
    main()
