/**
 * Visible marker for content Steve still needs to fill in (see content/site.ts).
 * Deliberately easy to spot so nothing ships unfinished by accident.
 */
export function isTodo(text: string) {
  return text.trimStart().startsWith("[TODO]");
}

export function Todo({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-block rounded border-2 border-dashed border-current px-2 py-0.5 text-sm font-medium opacity-80 ${className}`}
    >
      {children}
    </span>
  );
}
