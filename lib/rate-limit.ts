/**
 * Simple in-memory rate limiter (sliding window per key, plus a global daily cap).
 *
 * Good enough for a portfolio: it stops casual abuse at no cost and needs no setup.
 * Limitation: on Vercel each serverless instance keeps its own counters, so limits
 * are per instance, not global. For a hard global limit, swap this for a shared
 * store such as Upstash Redis (@upstash/ratelimit) with the same function signature.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = Number(process.env.ASK_RATE_LIMIT ?? 10);
const MAX_PER_DAY_GLOBAL = Number(process.env.ASK_DAILY_CAP ?? 300);

const hits = new Map<string, number[]>();
let day = new Date().toISOString().slice(0, 10);
let dayCount = 0;

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();

  const today = new Date(now).toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    dayCount = 0;
  }
  if (dayCount >= MAX_PER_DAY_GLOBAL) {
    return { ok: false, retryAfterSeconds: 60 * 60 };
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return { ok: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);
  dayCount += 1;

  // Keep memory bounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return { ok: true };
}
