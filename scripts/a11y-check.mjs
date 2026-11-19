// Keyboard + touch-target check: tabs through each page and verifies every
// focusable element shows a visible outline and is at least 44px tall.
// Usage: node scripts/a11y-check.mjs [path ...]
import puppeteer from "puppeteer-core";

const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/en", "/en/about", "/en/projects", "/en/projects/voice-assistant", "/en/contact", "/fr", "/fr/contact"];
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
let problems = 0;
for (const scheme of ["light", "dark"]) {
  for (const path of paths) {
    const page = await browser.newPage();
    await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
    await page.goto(`http://localhost:3100${path}`, { waitUntil: "networkidle0" });
    const seen = [];
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          text: (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 40),
          h: Math.round(r.height),
          w: Math.round(r.width),
          outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2,
          color: cs.outlineColor,
        };
      });
      if (!info || seen.some((s) => s.text === info.text && s.i === i)) break;
      if (seen.length && seen[0].text === info.text) break; // wrapped around
      seen.push({ ...info, i });
    }
    // Skip-link is visually hidden until focused, so it is measured while focused like the rest.
    const bad = seen.filter((s) => !s.outline || s.h < 44);
    problems += bad.length;
    console.log(`${path} [${scheme}] ${seen.length} focus stops, ${bad.length} problems`);
    for (const b of bad) console.log(`   - "${b.text}" ${b.w}x${b.h} outline=${b.outline}`);
    if (scheme === "light") console.log("   order: " + seen.map((s) => s.text).join(" | "));
    await page.close();
  }
}
await browser.close();
process.exit(problems ? 1 : 0);
