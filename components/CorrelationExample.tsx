"use client";

import { motion, useReducedMotion } from "motion/react";

const rows = [
  { step: "search", predicted: 0.388, measured: 0.743 },
  { step: "analyze", predicted: 0.58, measured: 0.799 },
  { step: "summarize", predicted: 0.23, measured: 0.76 },
];

export function CorrelationExample() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--color-border)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-medium tracking-tight text-[var(--color-ink)]">
              What validating the linter looks like
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              First real run, 2026-06-16: the research genome against 12
              tasks, comparing two model sizes on the same provider (Groq
              8B vs Groq 70B) while other free-tier backends were
              quota-blocked. Predicted risk and measured divergence
              correlated at 0.719 &mdash; a positive signal, not proof.
            </p>
            <p className="mt-4 text-xs text-[var(--color-ink-faint)]">
              This is a same-provider, different-model-size comparison, not
              the cross-provider comparison this project is actually trying
              to validate. See docs/roadmap.md for the full caveat and the
              pending cross-provider run.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="surface overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-[var(--color-border)] px-4 py-3 text-xs text-[var(--color-ink-faint)] sm:gap-4 sm:px-5">
                <span>Step</span>
                <span className="w-20 text-right sm:w-28">Predicted</span>
                <span className="w-20 text-right sm:w-28">Measured</span>
              </div>

              {rows.map((row, i) => (
                <BarRow key={row.step} row={row} index={i} reduce={!!reduce} />
              ))}

              <div className="border-t border-[var(--color-border)] px-5 py-4">
                <p
