"use client";

import { useEffect, useRef, useState } from "react";

type Labels = { gmail: string; outlook: string; app: string; copy: string; copied: string; menu: string };

/**
 * "Send me an email" button that never shows the address on the page.
 *
 * The server passes the address encoded (reversed + base64), so it isn't in the
 * page HTML for scrapers. It is decoded only when the menu opens, and the menu
 * items are ordinary links (Gmail, Outlook, mailto) plus a copy button.
 * Real links work in every browser, including ones that block pop-ups opened
 * from scripts, and copying falls back to an older method where the modern
 * clipboard API isn't available.
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
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const open = address !== null;

  function toggle() {
    setAddress(open ? null : Array.from(atob(encoded)).reverse().join(""));
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAddress(null);
        buttonRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setAddress(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  async function copy() {
    if (!address) return;
    let ok = false;
    try {
      await navigator.clipboard.writeText(address);
      ok = true;
    } catch {
      // Older or restricted browsers: copy through a temporary text field.
      const field = document.createElement("textarea");
      field.value = address;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      ok = document.execCommand("copy");
      field.remove();
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  // Close after picking a link. Deferred so the browser follows the link first.
  const closeSoon = () => setTimeout(() => setAddress(null), 0);

  const item =
    "flex min-h-11 w-full items-center rounded-lg px-4 text-left font-medium text-[var(--brand-ink)] hover:bg-[var(--brand-lilac)]";
  const to = address ? encodeURIComponent(address) : "";

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="email-options"
        onClick={toggle}
        className={className}
      >
        {label}
      </button>
      {open && (
        <ul
          id="email-options"
          aria-label={labels.menu}
          className="absolute top-full left-0 z-30 mt-2 w-64 rounded-2xl bg-white p-2 shadow-[0_0_0_2px_var(--brand-ink)]"
        >
          <li>
            <a
              className={item}
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${to}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeSoon}
            >
              {labels.gmail}
            </a>
          </li>
          <li>
            <a
              className={item}
              href={`https://outlook.live.com/mail/0/deeplink/compose?to=${to}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeSoon}
            >
              {labels.outlook}
            </a>
          </li>
          <li>
            <a className={item} href={`mailto:${address}`} onClick={closeSoon}>
              {labels.app}
            </a>
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
