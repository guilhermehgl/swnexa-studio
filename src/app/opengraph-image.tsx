import { ImageResponse } from "next/og";
export const alt = "SWNexa Studio — sites, sistemas e experiências digitais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 70,
        background: "#22251f",
        color: "#f7f7f2",
      }}
    >
      <div style={{ display: "flex", fontSize: 36 }}>SWNexa Studio</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 72,
          letterSpacing: -3,
        }}
      >
        <span>Sites que impressionam.</span>
        <span>Sistemas que resolvem.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#b8e957",
          fontSize: 22,
        }}
      >
        <span>DESIGN & TECNOLOGIA SOB MEDIDA</span>
        <span>studio.swnexa.com</span>
      </div>
    </div>,
    size,
  );
}
