"use client";

import { motion, useReducedMotion } from "motion/react";

const rows = [
  { step: "search", predicted: 0.39, measured: 0.87 },
  { step: "analyze", predicted: 0.41, measured: 0.96 },
  { step: "summarize", predicted: 0.16, measured: 0.0 },
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
              This is a worked example, not a real measurement. The same
              genome ran against two backends on one prompt, then each
              step&apos;s outputs were compared for word overlap. The shape of
              the result is the point: a low-risk step like summarize landing
              near zero divergence, and a high-risk step like analyze landing
              near one, is what would make the linter worth trusting.
            </p>
            <p className="mt-4 text-xs text-[var(--color-ink-faint)]">
              Real numbers depend on real runs. See validate_linter.py in the
              repo to produce your own.
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
                <p className="font-mono-tight text-sm text-[var(--color-ink)]">
                  correlation = 1.0
                </p>
                <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                  Strong signal on this single illustrative run. One data
                  point is not validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BarRow({
  row,
  index,
  reduce,
}: {
  row: { step: string; predicted: number; measured: number };
  index: number;
  reduce: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-[var(--color-border)] px-4 py-4 last:border-b-0 sm:gap-4 sm:px-5">
      <span className="font-mono-tight text-sm text-[var(--color-ink)]">
        {row.step}
      </span>

      <div className="flex w-20 items-center justify-end gap-1.5 sm:w-28 sm:gap-2">
        <div className="h-1.5 w-10 overflow-hidden rounded-full bg-[var(--color-bg-raised-2)] sm:w-16">
          <motion.div
            className="h-full rounded-full bg-[var(--color-accent)]"
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: `${row.predicted * 100}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="font-mono-tight text-xs text-[var(--color-ink-muted)]">
          {row.predicted.toFixed(2)}
        </span>
      </div>

      <div className="flex w-20 items-center justify-end gap-1.5 sm:w-28 sm:gap-2">
        <div className="h-1.5 w-10 overflow-hidden rounded-full bg-[var(--color-bg-raised-2)] sm:w-16">
          <motion.div
            className="h-full rounded-full bg-[var(--color-risk-medium)]"
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: `${row.measured * 100}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: index * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="font-mono-tight text-xs text-[var(--color-ink-muted)]">
          {row.measured.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
