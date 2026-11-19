import Anthropic from "@anthropic-ai/sdk";
import { askEnabled, systemPrompt } from "@/lib/ask";
import { rateLimit } from "@/lib/rate-limit";

const MODEL = process.env.ASK_MODEL ?? "claude-opus-5-5";
const MAX_MESSAGES = 8; // last few turns of context
const MAX_CHARS = 500; // per visitor message

type Turn = { role: "user" | "assistant"; content: string };

function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function parseTurns(body: unknown): Turn[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages.slice(-MAX_MESSAGES);
  const turns: Turn[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (!text) return null;
    turns.push({ role, content: text });
  }
  // The API needs the conversation to start and end with the visitor.
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

export async function POST(request: Request) {
  if (!askEnabled()) return json({ error: "Not found" }, 404);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return json(
      { error: "You've asked a lot of questions in a short time. Try again in a few minutes, or use the contact section." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let turns: Turn[] | null = null;
  try {
    turns = parseTurns(await request.json());
  } catch {
    turns = null;
  }
  if (!turns) return json({ error: "Send a question of up to 500 characters." }, 400);

  const client = new Anthropic(); // reads ANTHROPIC_API_KEY on the server only

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4000,
      output_config: { effort: "low" },
      // If the model declines, the API retries on a suitable fallback model in the same call.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: systemPrompt(), cache_control: { type: "ephemeral" } }],
      messages: turns,
    });

    if (response.stop_reason === "refusal") {
      return json({ answer: "I can only answer questions about Steve's work, skills and background." });
    }
    const answer = response.content
      .flatMap((b) => (b.type === "text" ? [b.text] : []))
      .join("")
      .trim();
    return json({ answer: answer || "I don't have that information. Please use the contact section to ask Steve directly." });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return json({ error: "The assistant is busy right now. Try again in a minute." }, 503);
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Ask API error ${error.status}: ${error.message}`);
    } else {
      console.error("Ask API error", error);
    }
    return json({ error: "The assistant isn't available right now. Please use the contact section instead." }, 502);
  }
}
