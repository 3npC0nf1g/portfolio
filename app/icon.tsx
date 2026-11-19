import { ImageResponse } from "next/og";
import { brand, displayFont } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.ultramarine,
          color: brand.blush,
          fontSize: 34,
          fontFamily: "Bricolage Grotesque",
          borderRadius: 16,
        }}
      >
        ST
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage Grotesque", data: displayFont, weight: 800, style: "normal" }] },
  );
}
