"use client";

import { useEffect, useRef, useState } from "react";

type Labels = { gmail: string; outlook: string; app: string; copy: string; copied: string };

/**
 * "Send me an email" button that never shows the address on the page.
 * The server passes it encoded (reversed + base64). Clicking opens a small menu:
 * Gmail, Outlook, the visitor's email app, or copy to clipboard. Offering web
 * options matters because many people have no desktop mail app set up, and a
 * bare mailto: link silently does nothing for them.
 */
export function EmailButton({
  encoded,
  label,
  labels,
  className = "",
}: {
  encoded: string;
  label: string;
  labels: Labels;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const address = () => Array.from(atob(encoded)).reverse().join("");

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  function openUrl(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(address());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: fall back to the mail app.
      window.location.href = `mailto:${address()}`;
    }
  }

  const item =
    "flex min-h-11 w-full items-center rounded-lg px-4 text-left font-medium text-[var(--brand-ink)] hover:bg-[var(--brand-blush)]";

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="email-options"
        onClick={() => setOpen((v) => !v)}
        className={className}
      >
        {label}
      </button>
      {open && (
        <ul
          id="email-options"
          aria-label="Ways to email me"
          className="absolute bottom-full left-0 z-30 mb-2 w-64 rounded-2xl bg-white p-2 shadow-[0_0_0_2px_var(--brand-ink)]"
        >
          <li>
            <button
              type="button"
              className={item}
              onClick={() => openUrl(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address())}`)}
            >
              {labels.gmail}
            </button>
          </li>
          <li>
            <button
              type="button"
              className={item}
              onClick={() =>
                openUrl(`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(address())}`)
              }
            >
              {labels.outlook}
            </button>
          </li>
          <li>
            <button
              type="button"
              className={item}
              onClick={() => {
                window.location.href = `mailto:${address()}`;
                setOpen(false);
              }}
            >
              {labels.app}
            </button>
          </li>
          <li>
            <button type="button" className={item} onClick={copy}>
              {copied ? labels.copied : labels.copy}
            </button>
          </li>
        </ul>
      )}
      <span role="status" className="sr-only">
        {copied ? labels.copied : ""}
      </span>
    </div>
  );
}
