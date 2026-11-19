"use client";

import { useRef, useState, type FormEvent } from "react";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has Steve built with LLMs?",
  "What was the result of the voice assistant?",
  "What is his education?",
];

/** "Ask about Steve" chat. Only rendered when ASK_ENABLED=true (see lib/ask.ts). */
export function AskSteve({ name }: { name: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || pending) return;
    const next: Turn[] = [...turns, { role: "user", content: q }];
    setTurns(next);
    setInput("");
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };
      if (!res.ok || !data.answer) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setTurns(turns); // drop the unanswered question so it can be re-sent
        setInput(q);
      } else {
        setTurns([...next, { role: "assistant", content: data.answer }]);
      }
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
      setTurns(turns);
      setInput(q);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void ask(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="fixed right-4 bottom-4 z-40 inline-flex min-h-12 items-center rounded-full bg-sun px-5 font-display font-semibold text-ink shadow-[0_0_0_2px_var(--brand-ink)] hover:bg-white"
        data-tone="pastel"
      >
        Ask about {name.split(" ")[0]}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="ask-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border-2 border-fg bg-canvas p-0 text-fg backdrop:bg-black/50 sm:mr-4 sm:mb-20"
      >
        <div className="flex max-h-[80dvh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
            <h2 id="ask-title" className="text-lg font-bold">
              Ask about {name}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex min-h-11 items-center rounded-full px-3 font-medium text-muted hover:text-fg"
            >
              Close
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4" aria-live="polite">
            {turns.length === 0 && (
              <div>
                <p className="text-muted">
                  Answers come only from the information on this site. For anything else, use the contact section.
                </p>
                <ul className="mt-4 flex flex-col items-start gap-2">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => void ask(s)}
                        className="min-h-11 rounded-2xl border border-line px-4 py-2 text-left text-sm font-medium hover:border-fg"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {turns.map((t, i) => (
              <p
                key={i}
                className={
                  t.role === "user"
                    ? "ml-8 rounded-lg bg-fg px-4 py-2 text-canvas"
                    : "mr-8 rounded-lg bg-surface px-4 py-2"
                }
              >
                <span className="sr-only">{t.role === "user" ? "You: " : "Answer: "}</span>
                {t.content}
              </p>
            ))}
            {pending && <p className="text-muted">Thinking…</p>}
            {error && (
              <p role="alert" className="font-medium">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
            <label htmlFor="ask-input" className="sr-only">
              Your question
            </label>
            <input
              id="ask-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder="Ask a question"
              className="min-h-11 flex-1 rounded-full border-2 border-line bg-canvas px-4 text-fg placeholder:text-muted focus:border-fg"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="min-h-11 rounded-full bg-fg px-5 font-display font-semibold text-canvas disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
