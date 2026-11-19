// Runs Lighthouse (mobile + desktop) against a running `next start` server.
// Usage: node scripts/lighthouse.mjs [path ...]   e.g. node scripts/lighthouse.mjs / /work/voice-assistant
import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";

const base = process.env.LH_BASE ?? "http://localhost:3100";
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/"];
mkdirSync(".lighthouse", { recursive: true });
let failed = false;

for (const path of paths) {
  for (const preset of ["mobile", "desktop"]) {
    const out = `.lighthouse/${path.replace(/\W+/g, "_") || "home"}-${preset}.json`;
    const args = [
      "lighthouse", base + path, "--quiet", "--output=json", `--output-path=${out}`,
      "--chrome-flags=--headless=new --no-sandbox",
      "--only-categories=performance,accessibility,best-practices,seo",
    ];
    if (preset === "desktop") args.push("--preset=desktop");
    execFileSync("npx", args, { stdio: "inherit" });
    const r = JSON.parse(readFileSync(out, "utf8"));
    const scores = Object.values(r.categories).map((c) => `${c.title}: ${Math.round(c.score * 100)}`);
    console.log(`${path} [${preset}] ${scores.join(" | ")}`);
    for (const c of Object.values(r.categories)) {
      if (c.score < 0.95) {
        failed = true;
        const bad = c.auditRefs
          .map((a) => r.audits[a.id])
          .filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "notApplicable")
          .map((a) => `   - ${a.id}: ${a.title}`);
        console.log(`  ${c.title} below 95:\n${bad.join("\n")}`);
      }
    }
  }
}
process.exit(failed ? 1 : 0);
