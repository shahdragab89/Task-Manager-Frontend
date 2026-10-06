import type { ReactNode } from "react";

export type Tone = "blue" | "violet" | "rose" | "teal" | "amber" | "green" | "gray";

interface PillProps {
  tone: Tone;
  children: ReactNode;
}

// Small colored label. The colors live in pages.css (.tone-blue, .tone-rose, ...)
export default function Pill({ tone, children }: PillProps) {
  return <span className={`pill tone-${tone}`}>{children}</span>;
}
