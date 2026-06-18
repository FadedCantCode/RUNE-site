"use client";

import { ArrowRight, GithubLogo, Minus, Equals } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-8 md:pt-20">
        <p className="pill mb-5 inline-flex items-center border border-[var(--color-border-strong)] px-3 py-1 font-mono-tight text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
          Open source, unvalidated by design
        </p>

        <h1 className="max-w-3xl text-4xl font-medium tracking-tighter text-[var(--color-ink)] md:text-5xl lg:text-[64px]">
          <span className="block">
            Find out which parts of your agent break across models,
          </span>
          <motion.span
            className="block text-[var(--color-ink-muted)]"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            before you run it.
          </motion.span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="https://github.com/FadedCantCode/Fabrica-RUNE"
            className="inline-flex h-11 items-center gap-2 bg-[var(--color-ink)] px-5 text-sm font-medium text-[var(--color-bg)] transition-transform active:scale-[0.98]"
          >
            View on GitHub
            <ArrowRight size={16} weight="bold" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-11 items-center gap-2 border border-[var(--color-border-strong)] px-5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-raised)]"
          >
            How it works
          </Link>
        </div>
      </div>

      {/* Full-bleed frame holding the one thing that's concretely true
          about this project: a real genome and its real, currently
          predicted risk scores, straight from divergence_linter.py. */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-16 md:pb-20">
        <div className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
          <div className="flex min-h-[420px] items-center justify-center px-6 py-20 md:min-h-[560px]">
            <GenomeVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function GenomeVisual() {
  // Live values from divergence_linter.py against research.rune. See
  // docs/roadmap.md for the validated correlation behind these numbers.
  const steps = [
    { name: "search", risk: 0.388, band: "medium" as const },
    { name: "analyze", risk: 0.58, band: "medium" as const },
    { name: "summarize", risk: 0.23, band: "low" as const },
  ];

  return (
    <div className="w-full max-w-md border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono-tight text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
          research.rune
        </span>
        <GithubLogo size={16} className="text-[var(--color-ink-faint)]" />
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step) => (
          <div
            key={step.name}
            className="flex items-center justify-between border border-[var(--color-border)] px-4 py-3"
          >
            <span className="font-mono-tight text-sm text-[var(--color-ink)]">
              {step.name}
            </span>
            <div className="flex items-center gap-2 font-mono-tight text-xs text-[var(--color-ink-muted)]">
              <RiskGlyph band={step.band} />
              <span className="uppercase tracking-wide">{step.band} risk</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-ink-faint)]">
        Predicted before any backend ran. See below for what these scores
        mean and how they get checked against real runs.
      </p>
    </div>
  );
}

// Risk severity reads through glyph shape and ink contrast, not a color
// scale. The page's one accent color is reserved for the divergence bars
// further down, not duplicated here as a traffic light.
function RiskGlyph({ band }: { band: "high" | "medium" | "low" }) {
  if (band === "high") {
    return <Equals size={12} weight="bold" className="text-[var(--color-ink)]" />;
  }
  if (band === "medium") {
    return <Minus size={12} weight="bold" className="text-[var(--color-ink-muted)]" />;
  }
  return <Minus size={12} weight="regular" className="text-[var(--color-ink-faint)]" />;
}
