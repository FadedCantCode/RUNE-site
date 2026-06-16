import { ArrowRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pt-16 pb-20 md:grid-cols-12 md:pt-20 md:pb-28">
        <div className="md:col-span-7">
          <p className="mb-5 inline-flex items-center rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-xs text-[var(--color-ink-muted)]">
            Open source, unvalidated by design
          </p>

          <h1 className="max-w-xl text-4xl font-medium tracking-tighter text-[var(--color-ink)] md:text-5xl lg:text-6xl">
            Find out which parts of your agent break across models, before you run it.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-ink-muted)]">
            RUNE specifies an agent as a portable genome, then scores each
            step for likely divergence across model backends.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
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

        <div className="md:col-span-5 md:flex md:items-center">
          <GenomeCard />
        </div>
      </div>
    </section>
  );
}

function GenomeCard() {
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
    <div className="surface w-full p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono-tight text-xs text-[var(--color-ink-faint)]">
          research.rune
        </span>
        <GithubLogo size={16} className="text-[var(--color-ink-faint)]" />
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step) => (
          <div
            key={step.name}
            className="flex items-center justify-between rounded-[8px] border border-[var(--color-border)] bg-[var(--color-bg-raised-2)] px-4 py-3"
          >
            <span className="font-mono-tight text-sm text-[var(--color-ink)]">
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

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-ink-faint)]">
        Predicted before any backend ran. See below for what these scores
        mean and how they get checked against real runs.
      </p>
    </div>
  );
}
