import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

/**
 * Gabarito ExtraBold for generated images (Satori reads .woff, not .woff2).
 * Read once at module load so the images stay static (built at build time).
 */
export const displayFont = await readFile(
  join(process.cwd(), "node_modules/@fontsource/gabarito/files/gabarito-latin-800-normal.woff"),
);

/** Profile photo as a data URL for generated images, or null if not set. */
export const photoDataUrl = site.hero.photo
  ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public", site.hero.photo))).toString("base64")}`
  : null;

export const brand = {
  violet: "#6246EA",
  ink: "#231F40",
  sun: "#FFD25A",
  mint: "#BFEFD9",
  white: "#FFFFFF",
  muted: "#E4DEFF",
};
