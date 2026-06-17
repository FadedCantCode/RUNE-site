"use client";

import { motion, useReducedMotion } from "motion/react";

const researchRows = [
  { step: "search", predicted: 0.388, measured: 0.823 },
  { step: "analyze", predicted: 0.58, measured: 0.853 },
  { step: "summarize", predicted: 0.23, measured: 0.802 },
];

const coderRows = [
  { step: "analyze", predicted: 0.605, measured: 0.185 },
  { step: "test", predicted: 0.57, measured: 0.186 },
  { step: "summarize", predicted: 0.465, measured: 0.154 },
  { step: "code", predicted: 0.395, measured: 0.113 },
];

// coder.rune's predicted (0.4–0.6) and measured (0.11–0.19) values sit on very
// different absolute scales — semantic-similarity divergence scores run much
// lower than the structural risk heuristic's 0–1 range. What the correlation
// (0.967) actually validates is the RANKING matching between the two series,
// not their absolute magnitudes. Rendering both on a shared 0–100% bar width
// would visually misrepresent a strong result as weak (all "measured" bars
// would look short relative to "predicted" ones for a reason that has nothing
// to do with how good the result is). Normalize each series independently to
// its own min–max range for bar width, while keeping the displayed numeric
// labels as the real raw values — this keeps the visual honest about what's
// actually being claimed.
function normalizeSeries(rows: typeof coderRows, key: "predicted" | "measured") {
  const values = rows.map((r) => r[key]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return rows.map((r) => (r[key] - min) / range);
}

export function CorrelationExample() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-[var(--color-border)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Primary result: research.rune */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-medium tracking-tight text-[var(--color-ink)]">
              What validating the linter looks like
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Cleanest run, 2026-06-17: the research genome against 12
              tasks, comparing Qwen3-32B (on Groq) against Mistral Small
              (on Mistral AI&apos;s own infrastructure) &mdash; two
              different labs, two different cloud providers, zero
              retries or rate-limit interference. Predicted risk and
              measured divergence correlated at 0.999.
            </p>
            <p className="mt-4 text-xs text-[var(--color-ink-faint)]">
              Two earlier same-day runs also scored positive: 0.99
              (Groq vs Cerebras, though Cerebras was rate-limited
              throughout) and 0.719 (Groq 8B vs Groq 70B, same
              provider). See docs/roadmap.md for all results in full.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="surface overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-[var(--color-border)] px-4 py-3 text-xs text-[var(--color-ink-faint)] sm:gap-4 sm:px-5">
                <span>Step</span>
                <span className="w-20 text-right sm:w-28">Predicted</span>
                <span className="w-20 text-right sm:w-28">Measured</span>
              </div>

              {researchRows.map((row, i) => (
                <BarRow key={row.step} row={row} index={i} reduce={!!reduce} />
              ))}

              <div className="border-t border-[var(--color-border)] px-5 py-4">
                <p className="font-mono-tight text-sm text-[var(--color-ink)]">
                  correlation = 0.999
                </p>
                <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                  Qwen3-32B (Groq) vs Mistral Small (Mistral AI), 12 tasks,
                  zero rate-limit interference.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second result: coder.rune, a different genome shape */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="text-xl font-medium tracking-tight text-[var(--color-ink)]">
              Does it hold up on a different genome shape?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              The results above are all on the research genome (search
              &rarr; analyze &rarr; summarize). Testing the same backend
              pairing on a coding genome (analyze &rarr; code &rarr; test
              &rarr; summarize, no tool steps) first scored a weak 0.152
              &mdash; a real negative result.
            </p>
            <p className="mt-4 text-xs text-[var(--color-ink-faint)]">
              Investigation found two genuine issues: the word-overlap
              measurement was penalizing code for having different
              variable names and formatting even when functionally
              identical, and the linter didn&apos;t account for
              &quot;summarize&quot; being more ambiguous after a coding
              task than after a research task. Fixing both brought the
              correlation to 0.967 on the same 12 tasks.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="surface overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-[var(--color-border)] px-4 py-3 text-xs text-[var(--color-ink-faint)] sm:gap-4 sm:px-5">
                <span>Step</span>
                <span className="w-20 text-right sm:w-28">Predicted</span>
                <span className="w-20 text-right sm:w-28">Measured</span>
              </div>

              {(() => {
                const normPredicted = normalizeSeries(coderRows, "predicted");
                const normMeasured = normalizeSeries(coderRows, "measured");
                return coderRows.map((row, i) => (
                  <BarRow
                    key={row.step}
                    row={row}
                    barWidths={{ predicted: normPredicted[i], measured: normMeasured[i] }}
                    index={i}
                    reduce={!!reduce}
                  />
                ));
              })()}

              <div className="border-t border-[var(--color-border)] px-5 py-4">
                <p className="font-mono-tight text-sm text-[var(--color-ink)]">
                  correlation = 0.967
                </p>
                <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                  After fixing the measurement method and a context-blind
                  scoring gap. Started at 0.152 before investigation. Bar
                  widths above are scaled per-column to show relative
                  ranking — predicted (0.4–0.6) and measured (0.11–0.19)
                  sit on different absolute scales, since correlation
                  measures whether the order matches, not the magnitude.
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
  barWidths,
}: {
  row: { step: string; predicted: number; measured: number };
  index: number;
  reduce: boolean;
  barWidths?: { predicted: number; measured: number };
}) {
  const predictedWidth = barWidths ? barWidths.predicted : row.predicted;
  const measuredWidth = barWidths ? barWidths.measured : row.measured;

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
            whileInView={{ width: `${predictedWidth * 100}%` }}
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
            whileInView={{ width: `${measuredWidth * 100}%` }}
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
