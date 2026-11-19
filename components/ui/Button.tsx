import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "accent" | "on-block";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-base font-bold leading-none transition-colors duration-150";

const variants: Record<Variant, string> = {
  // Solid ink on light, solid light on dark (fg/canvas flip with the theme).
  primary: "bg-fg text-canvas hover:bg-link",
  // Outline on light backgrounds.
  secondary: "border-2 border-fg text-fg hover:bg-fg hover:text-canvas",
  // Blush fill with ink text. Safe on any background.
  accent: "bg-accent text-on-accent hover:bg-white",
  // Outline for use inside ultramarine or ink blocks.
  "on-block": "border-2 border-current hover:bg-white hover:text-[var(--brand-ink)]",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
};

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

/** Same look as ButtonLink, for plain <a> targets such as files and mailto. */
export function ButtonAnchor({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
