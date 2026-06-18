"use client";

import { motion, useReducedMotion } from "motion/react";
import LogoLoop from "./LogoLoop"; // React Bits component, see LogoLoop.jsx for the source

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

// coder.rune's predicted (0.4 to 0.6) and measured (0.11 to 0.19) values sit
// on different absolute scales. See prior reasoning in this file's history.
// Each series is normalized independently to its own min-max range for bar
// width, while displayed numeric labels stay as the real raw values.
function normalizeSeries(rows: typeof coderRows, key: "predicted" | "measured") {
  const values = rows.map((r) => r[key]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return rows.map((r) => (r[key] - min) / range);
}

// Backends actually integrated and verified in this project. Rendered as
// plain text wordmarks here as a placeholder. Per the design system's own
// checklist, a real logo wall should use actual SVG marks (Simple Icons or
// each provider's own brand asset), not text standing in for a logo. Swap
// these for real <img>/SVG entries before treating this as a finished wall.
const integratedBackends = [
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>GROQ</span> },
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>CEREBRAS</span> },
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>MISTRAL AI</span> },
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>OPENAI</span> },
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>ANTHROPIC</span> },
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>GOOGLE</span> },
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>DEEPSEEK</span> },
  { node: <span className="text-body" style={{ letterSpacing: "0.05em" }}>NVIDIA NIM</span> },
];

export function CorrelationExample() {
  const reduce = useReducedMotion();

  return (
    <section
      style={{
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      {/* Provider strip, monochrome and quiet, sits above the section content
          rather than competing with it. Pauses on hover per LogoLoop's API. */}
      <div style={{ marginBottom: "48px" }}>
        <LogoLoop
          logos={integratedBackends}
          speed={60}
          direction="left"
          gap={48}
          logoHeight={20}
          fadeOut
          fadeOutColor="var(--color-bg)"
          pauseOnHover
          ariaLabel="Integrated model backends"
        />
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Primary result: research.rune */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "48px" }}>
          <div style={{ gridColumn: "span 5" }}>
            <h2 className="text-heading" style={{ color: "var(--color-ink)" }}>
              What Validating The Linter Looks Like
            </h2>
            <p
              className="text-body"
              style={{ color: "var(--color-ink-muted)", marginTop: "16px" }}
            >
              Cleanest run, 2026-06-17: the research genome against 12 tasks,
              comparing Qwen3-32B (on Groq) against Mistral Small (on Mistral
              AI's own infrastructure). Two different labs, two different
              cloud providers, zero retries or rate-limit interference.
              Predicted risk and measured divergence correlated at 0.999.
            </p>
            <p
              className="text-caption"
              style={{ color: "var(--color-ink-faint)", marginTop: "16px" }}
            >
              Two earlier same-day runs also scored positive: 0.99 (Groq vs
              Cerebras, though Cerebras was rate-limited throughout) and
              0.719 (Groq 8B vs Groq 70B, same provider). See docs/roadmap.md
              for all results in full.
            </p>
          </div>

          <div style={{ gridColumn: "span 7" }}>
            <div className="surface">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "16px",
                  borderBottom: "1px solid var(--color-border)",
                  padding: "12px 20px",
                }}
                className="text-caption"
              >
                <span style={{ color: "var(--color-ink-faint)" }}>STEP</span>
                <span style={{ color: "var(--color-ink-faint)", width: "112px", textAlign: "right" }}>
                  PREDICTED
                </span>
                <span style={{ color: "var(--color-ink-faint)", width: "112px", textAlign: "right" }}>
                  MEASURED
                </span>
              </div>

              {researchRows.map((row, i) => (
                <BarRow key={row.step} row={row} index={i} reduce={!!reduce} />
              ))}

              <div style={{ borderTop: "1px solid var(--color-border)", padding: "16px 20px" }}>
                <p className="text-body" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
                  CORRELATION = 0.999
                </p>
                <p className="text-caption" style={{ color: "var(--color-ink-faint)", marginTop: "4px" }}>
                  Qwen3-32B (Groq) vs Mistral Small (Mistral AI), 12 tasks,
                  zero rate-limit interference.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second result: coder.rune, a different genome shape */}
        <div
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "48px",
          }}
        >
          <div style={{ gridColumn: "span 5" }}>
            <h3 className="text-subheading" style={{ color: "var(--color-ink)", textTransform: "uppercase" }}>
              Does It Hold Up On A Different Genome Shape?
            </h3>
            <p
              className="text-body"
              style={{ color: "var(--color-ink-muted)", marginTop: "16px" }}
            >
              The results above are all on the research genome (search,
              analyze, summarize). Testing the same backend pairing on a
              coding genome (analyze, code, test, summarize, no tool steps)
              first scored a weak 0.152, a real negative result.
            </p>
            <p
              className="text-caption"
              style={{ color: "var(--color-ink-faint)", marginTop: "16px" }}
            >
              Investigation found two genuine issues: the word-overlap
              measurement was penalizing code for having different variable
              names and formatting even when functionally identical, and the
              linter did not account for "summarize" being more ambiguous
              after a coding task than after a research task. Fixing both
              brought the correlation to 0.967 on the same 12 tasks.
            </p>
          </div>

          <div style={{ gridColumn: "span 7" }}>
            <div className="surface">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "16px",
                  borderBottom: "1px solid var(--color-border)",
                  padding: "12px 20px",
                }}
                className="text-caption"
              >
                <span style={{ color: "var(--color-ink-faint)" }}>STEP</span>
                <span style={{ color: "var(--color-ink-faint)", width: "112px", textAlign: "right" }}>
                  PREDICTED
                </span>
                <span style={{ color: "var(--color-ink-faint)", width: "112px", textAlign: "right" }}>
                  MEASURED
                </span>
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

              <div style={{ borderTop: "1px solid var(--color-border)", padding: "16px 20px" }}>
                <p className="text-body" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
                  CORRELATION = 0.967
                </p>
                <p className="text-caption" style={{ color: "var(--color-ink-faint)", marginTop: "4px" }}>
                  After fixing the measurement method and a context-blind
                  scoring gap. Started at 0.152 before investigation. Bar
                  widths are scaled per-column to show relative ranking,
                  predicted and measured sit on different absolute scales.
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        alignItems: "center",
        gap: "16px",
        borderBottom: "1px solid var(--color-border)",
        padding: "16px 20px",
      }}
    >
      <span className="text-body" style={{ color: "var(--color-ink)", textTransform: "uppercase" }}>
        {row.step}
      </span>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", width: "112px" }}>
        <div style={{ height: "6px", width: "64px", background: "var(--color-border)", overflow: "hidden" }}>
          <motion.div
            className="bar-predicted"
            style={{ height: "100%" }}
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: `${predictedWidth * 100}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="text-caption" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-muted)" }}>
          {row.predicted.toFixed(2)}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", width: "112px" }}>
        <div style={{ height: "6px", width: "64px", background: "var(--color-border)", overflow: "hidden" }}>
          <motion.div
            className="bar-measured"
            style={{ height: "100%" }}
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: `${measuredWidth * 100}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: index * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="text-caption" style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-muted)" }}>
          {row.measured.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
