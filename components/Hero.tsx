"use client";

import { useRef } from "react";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });

  const line2Opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0, 0.35], [12, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-8 md:pt-20">
        <p className="mb-5 inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-xs text-[var(--color-ink-muted)]">
          Open source, unvalidated by design
        </p>

        <h1 className="max-w-3xl text-4xl font-medium tracking-tighter text-[var(--color-ink)] md:text-5xl lg:text-[64px]">
          <span className="block">
            Find out which parts of your agent break across models.
          </span>
          <motion.span
            className="block text-[var(--color-ink-muted)]"
            style={
              reduce
                ? undefined
                : { opacity: line2Opacity, y: line2Y }
            }
          >
            before you run it.
          </motion.span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="https://github.com/FadedCantCode/Fabrica-RUNE"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-base)] bg-[var(--color-accent)] px-5 text-sm font-medium text-[#0a0c0f] transition-transform active:scale-[0.98]"
          >
            View on GitHub
            <ArrowRight size={16} weight="bold" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-base)] border border-[var(--color-border-strong)] px-5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-raised)]"
          >
            How it works
          </Link>
        </div>
      </div>

      <div
        ref={frameRef}
        className="relative mx-auto max-w-[1400px] px-6 pb-16 md:pb-20"
      >
        <div className="relative overflow-hidden rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[#05060a]">
          <div className="flex min-h-[420px] items-center justify-center px-6 py-20 md:min-h-[560px]">
            <GenomeVisual />
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 px-6 py-4"
            style={reduce ? undefined : { opacity: cueOpacity }}
          >
            <span className="font-mono-tight text-xs text-white/30">+</span>
            <span className="font-mono-tight text-xs uppercase tracking-wide text-white/50">
              Scroll to explore
            </span>
            <span className="font-mono-tight text-xs text-white/30">+</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GenomeVisual() {
  const steps = [
    { name: "search", risk: "medium" },
    { name: "analyze", risk: "high" },
    { name: "summarize", risk: "low" },
  ];

  const riskColor: Record<string, string> = {
    high: "var(--color-risk-high)",
    medium: "var(--color-risk-medium)",
    low: "var(--color-risk-low)",
  };

  return (
    <div className="w-full max-w-md rounded-[var(--radius-base)] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono-tight text-xs text-white/40">
          research.rune
        </span>
        <GithubLogo size={16} className="text-white/30" />
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step) => (
          <div
            key={step.name}
            className="flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.04] px-4 py-3"
          >
            <span className="font-mono-tight text-sm text-white/90">
              {step.name}
            </span>
            <span
              className="font-mono-tight text-xs"
              style={{ color: riskColor[step.risk] }}
            >
              {step.risk} risk
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-white/40">
        Predicted before any backend ran. See below for what these scores
        mean and how they get checked against real runs.
      </p>
    </div>
  );
}
