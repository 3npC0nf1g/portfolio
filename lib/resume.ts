import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/site";

/**
 * The resume link, or null if the PDF isn't in /public yet.
 * Checked at build time, so the download buttons never point to a missing file.
 */
export const resume = (() => {
  const { href, label, downloadName } = site.contact.resume;
  if (!href || !existsSync(join(process.cwd(), "public", href))) return null;
  return { href, label, downloadName };
})();
