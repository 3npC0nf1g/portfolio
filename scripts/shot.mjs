// Screenshot helper for visual review (uses puppeteer-core from Lighthouse + local Chrome).
// Usage: node scripts/shot.mjs <path> <width> <light|dark> <out.png>
import puppeteer from "puppeteer-core";

const [path = "/", width = "1280", scheme = "light", out = "shot.png"] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 800, deviceScaleFactor: 1, isMobile: Number(width) < 600, hasTouch: Number(width) < 600 });
await page.emulateMediaFeatures([
  { name: "prefers-color-scheme", value: scheme },
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await page.goto(`http://localhost:3100${path}`, { waitUntil: "networkidle0" });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(`${path} @${width} ${scheme}: horizontal overflow ${overflow}px`);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
