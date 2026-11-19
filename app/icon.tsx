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
          background: brand.violet,
          color: brand.sun,
          fontSize: 34,
          fontFamily: "Gabarito",
          borderRadius: 16,
        }}
      >
        ST
      </div>
    ),
    { ...size, fonts: [{ name: "Gabarito", data: displayFont, weight: 800, style: "normal" }] },
  );
}
