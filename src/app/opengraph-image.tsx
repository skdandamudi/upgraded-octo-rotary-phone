import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "K8S Systems Inc — Kubernetes. DevOps. Cloud Excellence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 80% at 0% 0%, #1E5BD8 0%, transparent 60%), radial-gradient(80% 60% at 100% 100%, #06B6D4 0%, transparent 60%), #0B1220",
          padding: 72,
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.5,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(135deg, #326CE5, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            K8
          </div>
          K8S Systems Inc
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 980,
              backgroundImage:
                "linear-gradient(120deg, #ffffff 0%, #BFDBFE 35%, #06B6D4 80%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Build, Scale, and Optimize Kubernetes Platforms.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#94A3B8",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Enterprise Kubernetes, DevOps, and cloud-native engineering.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#94A3B8",
            fontSize: 22,
          }}
        >
          <span>k8ssystems.com</span>
          <span style={{ fontFamily: "monospace" }}>
            Kubernetes · DevOps · Cloud
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
