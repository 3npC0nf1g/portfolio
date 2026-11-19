import { site } from "@/content/site";

/**
 * Contact email from content/site.ts, encoded (reversed + base64) for the
 * EmailButton so the plain address never appears in the page. null if unset.
 */
export const encodedEmail = (() => {
  const address = site.contact.email.address?.trim();
  if (!address) return null;
  return Buffer.from(Array.from(address).reverse().join("")).toString("base64");
})();
