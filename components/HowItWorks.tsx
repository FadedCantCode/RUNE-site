import { MagnifyingGlass, Brain, FileText } from "@phosphor-icons/react/dist/ssr";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-[var(--color-border)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-[var(--color-ink)] md:text-4xl">
            One spec, run against multiple backends, scored for divergence
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-muted)]">
            A <code className="font-mono-tight text-[var(--color-ink)]">.rune</code> file
            declares an ordered list of steps. The linter scores each step on
            how much interpretive freedom it leaves a model, before any
            backend ever sees the task.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          <FlowStep
            pillColor="pill-lavender"
            icon={<FileText size={20} weight="duotone" />}
            label="01"
            title="Write the genome"
            body="search, analyze, summarize. Each step is plain text the runtime turns into a prompt for whichever backend you choose."
          />
          <FlowStep
            pillColor="pill-pink"
            icon={<Brain size={20} weight="duotone" />}
            label="02"
            title="Lint before running"
            body="Vague steps like analyze score higher risk than narrow ones like summarize. No API call needed for this step."
          />
          <FlowStep
            pillColor="pill-yellow"
            icon={<MagnifyingGlass size={20} weight="duotone" />}
            label="03"
            title="Check it against reality"
            body="Run the same genome on real backends and measure actual semantic divergence per step, then correlate it against the prediction."
          />
        </div>

        {/* Live output, matches divergence_linter.py's current values for
            research.rune. See docs/roadmap.md for the validated
            correlations (0.719 / 0.99 / 0.999) measured against these
            same predictions. */}
        <div className="mt-8 surface p-5">
          <p className="font-mono-tight text-sm text-[var(--color-ink-muted)]">
            $ python divergence_linter.py research.rune
          </p>
          <pre className="mt-3 overflow-x-auto font-mono-tight text-[13px] leading-relaxed text-[var(--color-ink-faint)]">
{`search       risk=0.39  medium
analyze      risk=0.58  medium
summarize    risk=0.23  low`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function FlowStep({
  icon,
  label,
  title,
  body,
  pillColor,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  pillColor: "pill-lavender" | "pill-pink" | "pill-yellow";
}) {
  return (
    <div className="surface p-7">
      <div className="flex items-center gap-3">
        <span className={`pill ${pillColor} flex h-10 w-10 items-center justify-center text-[var(--color-ink)]`}>
          {icon}
        </span>
        <span className="font-mono-tight text-xs text-[var(--color-ink-faint)]">
          {label}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-medium text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        {body}
      </p>
    </div>
  );
}
