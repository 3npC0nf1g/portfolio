import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

/**
 * Bricolage Grotesque ExtraBold for generated images (Satori reads .woff, not .woff2).
 * Read once at module load so the images stay static (built at build time).
 */
export const displayFont = await readFile(
  join(process.cwd(), "node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff"),
);

/** Profile photo as a data URL for generated images, or null if not set. */
export const photoDataUrl = site.hero.photo
  ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public", site.hero.photo))).toString("base64")}`
  : null;

export const brand = {
  ultramarine: "#2B36E8",
  ink: "#10112A",
  blush: "#FFCFE4",
  white: "#FFFFFF",
  muted: "#DADCFF",
};
