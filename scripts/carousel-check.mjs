// Checks the home-page projects carousel in Chrome:
// arrows, mouse drag (without opening a card), dots, and clicking/tapping a card.
// Usage: node scripts/carousel-check.mjs   (needs `npm start` running)
import puppeteer from "puppeteer-core";

const base = process.env.LH_BASE ?? "http://localhost:3100";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let failed = false;
const check = (ok, msg) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${msg}`);
  if (!ok) failed = true;
};

for (const [width, mobile] of [
  [1440, false],
  [390, true],
]) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewport({ width, height: 900, isMobile: mobile, hasTouch: mobile });
  await page.goto(`${base}/en`, { waitUntil: "networkidle0" });

  const track = "[aria-roledescription=carousel] ul[tabindex]";
  const scrollLeft = () => page.$eval(track, (e) => Math.round(e.scrollLeft));
  await page.$eval(track, (e) => e.scrollIntoView({ block: "center" }));
  await wait(1200); // let the page's own smooth scroll finish first

  // Arrow
  const [, next] = await page.$$("[aria-roledescription=carousel] button");
  if (mobile) await next.tap();
  else await next.click();
  await wait(900);
  check((await scrollLeft()) > 0, `@${width} Next arrow scrolls (${await scrollLeft()}px)`);

  // Dots
  const dots = await page.$$("[aria-roledescription=carousel] button[aria-current], [aria-roledescription=carousel] .grid.size-11");
  if (mobile) await dots[dots.length - 1].tap();
  else await dots[dots.length - 1].click();
  await wait(900);
  const atEnd = await page.$eval(track, (e) => e.scrollLeft + e.clientWidth >= e.scrollWidth - 4);
  check(atEnd, `@${width} last dot jumps to the end`);
  if (mobile) await dots[0].tap();
  else await dots[0].click();
  await wait(900);
  check((await scrollLeft()) === 0, `@${width} first dot jumps back to the start`);

  // Mouse drag (desktop only)
  if (!mobile) {
    const box = await (await page.$(`${track} > li`)).boundingBox();
    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + 300, y);
    await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(box.x + 300 - i * 40, y);
    await page.mouse.up();
    await wait(900);
    const url = await page.evaluate(() => location.pathname);
    check((await scrollLeft()) > 0 && url === "/en", `@${width} mouse drag scrolls (${await scrollLeft()}px) and doesn't open a card`);
  }

  // Click/tap a visible card
  const cards = await page.$$(`${track} > li article`);
  let target;
  for (const c of cards) {
    const b = await c.boundingBox();
    if (b.x >= 0 && b.x + b.width / 2 < width) {
      target = b;
      break;
    }
  }
  if (mobile) await page.touchscreen.tap(target.x + target.width / 2, target.y + target.height / 2);
  else await page.mouse.click(target.x + target.width / 2, target.y + target.height / 2);
  await wait(1500);
  const url = await page.evaluate(() => location.pathname + location.hash);
  check(url.startsWith("/en/projects#"), `@${width} clicking a card opens ${url}`);
  check(errors.length === 0, `@${width} no page errors${errors.length ? ": " + errors.join(" | ") : ""}`);
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
