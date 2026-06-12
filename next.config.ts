import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow other devices on the local network to access the dev server.
  // Next.js blocks cross-origin dev requests by default; this whitelists
  // common private network ranges so anyone on the same LAN can connect.
  allowedDevOrigins: [
    "192.168.11.178",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.2*.*.*",
    "172.3*.*.*",
    "*.local",
  ],
};

export default nextConfig;
