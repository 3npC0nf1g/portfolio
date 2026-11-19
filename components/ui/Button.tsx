import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "sun" | "white" | "on-primary";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-base font-bold leading-none transition-colors duration-150";

const variants: Record<Variant, string> = {
  // Violet fill, for light backgrounds.
  primary: "bg-primary text-on-primary hover:bg-ink",
  // Outline that follows the text colour.
  outline: "border-2 border-current hover:bg-fg hover:text-canvas",
  // Sunshine fill with ink text. Works on any background.
  sun: "bg-sun text-ink hover:bg-white",
  // White fill with ink text, for violet or pastel backgrounds.
  white: "bg-white text-ink hover:bg-sun",
  // White outline for the violet card.
  "on-primary": "border-2 border-on-primary text-on-primary hover:bg-white hover:text-ink",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
};

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

/** Same look as ButtonLink, for plain <a> targets such as file downloads. */
export function ButtonAnchor({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
