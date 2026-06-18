"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-8 md:pt-20">
        <div className="pill mb-8 inline-flex border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-3 py-1 font-mono-tight text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
          Open source, unvalidated by design
        </div>

        {/* Headline built from alternating plain-text and pill-chip words,
            each chip a flat decorative pastel, never used for data. */}
        <h1 className="font-display flex max-w-4xl flex-wrap items-center gap-x-3 gap-y-3 text-3xl leading-tight text-[var(--color-ink)] md:text-5xl md:leading-[1.15]">
          <span className="pill bg-[var(--color-pill-lavender)] px-4 py-1">
            One spec,
          </span>
          <span>three backends,</span>
          <span className="pill bg-[var(--color-pill-gray)] px-4 py-1">
            scored
          </span>
          <span>for</span>
          <span className="pill bg-[var(--color-pill-pink)] px-4 py-1">
            divergence
          </span>
          <span>before you run it.</span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)]">
          A <code className="font-mono-tight text-[var(--color-ink)]">.rune</code> file
          declares an ordered list of agent steps. The linter scores each
          step for how much room it leaves a model to diverge, before any
          backend ever sees the task.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="https://github.com/FadedCantCode/Fabrica-RUNE"
            className="pill inline-flex h-11 items-center gap-2 bg-[var(--color-ink)] px-5 text-sm font-medium text-[var(--color-bg)] transition-transform active:scale-[0.98]"
          >
            View on GitHub
            <ArrowRight size={16} weight="bold" />
          </Link>
          <Link
            href="#how-it-works"
            className="pill inline-flex h-11 items-center gap-2 border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-raised-2)]"
          >
            How it works
          </Link>
        </div>
      </div>

      {/* Hero centerpiece: a rendered .rune block, RUNE's equivalent of a
          tangible product shot. No literal product exists, so this stands
          in as the one signature visual element on the page, per the
          design brief, everything else stays quiet around it. */}
      <div className="relative mx-auto flex max-w-[1400px] justify-center px-6 pb-16 md:pb-24">
        <RuneBlock reduce={!!reduce} />
      </div>
    </section>
  );
}

function RuneBlock({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative"
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Ambient glow, the one place a soft blur/shadow is used on the
          page, scoped entirely to this single signature object. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--color-glow) 0%, transparent 70%)",
          opacity: 0.35,
        }}
      />

      <div
        className="relative flex h-[280px] w-[280px] flex-col items-center justify-center rounded-[28px] border-[3px] border-[var(--color-ink)] bg-[var(--color-bg-raised)] shadow-[0_18px_0_0_var(--color-ink)] md:h-[340px] md:w-[340px]"
      >
        <span className="font-display text-5xl text-[var(--color-ink)] md:text-6xl">
          R
        </span>
        <span className="mt-2 font-mono-tight text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
          .rune
        </span>

        {/* Floating risk tags, echoing the predicted-risk concept without
            using the data accent color, this is decoration, not data. */}
        <motion.div
          className="pill absolute -left-6 top-10 bg-[var(--color-pill-yellow)] px-3 py-1 font-mono-tight text-[10px] uppercase tracking-wide text-[var(--color-ink)]"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          search
        </motion.div>
        <motion.div
          className="pill absolute -right-8 top-1/2 bg-[var(--color-pill-pink)] px-3 py-1 font-mono-tight text-[10px] uppercase tracking-wide text-[var(--color-ink)]"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          analyze
        </motion.div>
        <motion.div
          className="pill absolute -bottom-5 left-1/3 bg-[var(--color-pill-lavender)] px-3 py-1 font-mono-tight text-[10px] uppercase tracking-wide text-[var(--color-ink)]"
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          summarize
        </motion.div>
      </div>
    </motion.div>
  );
}
