import { ImageResponse } from "next/og";
import { brand, displayFont, photoDataUrl } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.person.name}, ${site.hero.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { person, hero } = site;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: brand.ultramarine,
          color: brand.white,
          padding: "72px",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 100, lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            {hero.greeting.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div style={{ fontSize: 44, marginTop: 28, color: brand.muted }}>{hero.role}</div>
          <div style={{ fontSize: 28, marginTop: 36, color: brand.muted }}>
            {`MSc AI and Computer Science with Distinction, ${person.education.school}`}
          </div>
        </div>
        {/* Tilted portrait on a blush block, echoing the hero on the site. */}
        <div style={{ display: "flex", position: "relative", width: 260, height: 320 }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 260,
              height: 320,
              background: brand.blush,
              borderRadius: 40,
              transform: "rotate(4deg) translate(12px, 12px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 260,
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: brand.ink,
              color: brand.blush,
              borderRadius: 40,
              border: `6px solid ${brand.white}`,
              transform: "rotate(-3deg)",
              fontSize: 120,
              overflow: "hidden",
            }}
          >
            {photoDataUrl ? (
              <img src={photoDataUrl} alt="" width={260} height={320} style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
            ) : (
              "ST"
            )}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage Grotesque", data: displayFont, weight: 800, style: "normal" }] },
  );
}
