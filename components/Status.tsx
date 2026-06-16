import { CheckCircle, Circle, Warning } from "@phosphor-icons/react/dist/ssr";

const items = [
  {
    state: "done" as const,
    title: "Spec format and multi-backend runtime",
    body: "The .rune YAML schema, validator, and runtime adapters for OpenAI, Anthropic, and Ollama all run and have been tested against malformed input.",
  },
  {
    state: "done" as const,
    title: "Divergence risk linter",
    body: "Scores each genome step on instruction specificity, tool ambiguity, and constraint coverage. The scoring logic runs and produces stable output.",
  },
  {
    state: "open" as const,
    title: "Whether the linter's scores predict anything real",
    body: "Unproven. The validation harness measures actual lexical divergence across real backend runs and correlates it against predicted risk, but it hasn't been run at scale yet.",
  },
  {
    state: "not-started" as const,
    title: "Semantic divergence measurement",
    body: "Current divergence proxy is word-overlap (Jaccard), which penalizes two backends that say the same thing in different words. Embedding-based similarity is the planned replacement.",
  },
];

export function Status() {
  return (
    <section id="status" className="border-b border-[var(--color-border)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-medium tracking-tight text-[var(--color-ink)]">
              What actually works right now
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Most agent-tooling pages claim more than they&apos;ve checked.
              This one is trying not to. Below is what&apos;s built, what&apos;s
              tested, and what&apos;s still just a hypothesis.
            </p>
          </div>

          <div className="md:col-span-8">
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li
                  key={item.title}
                  className="surface flex gap-4 p-5"
                >
                  <StatusIcon state={item.state} />
                  <div>
                    <h3 className="text-[15px] font-medium text-[var(--color-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusIcon({ state }: { state: "done" | "open" | "not-started" }) {
  if (state === "done") {
    return (
      <CheckCircle
        size={20}
        weight="fill"
        className="mt-0.5 shrink-0 text-[var(--color-risk-low)]"
      />
    );
  }
  if (state === "open") {
    return (
      <Warning
        size={20}
        weight="fill"
        className="mt-0.5 shrink-0 text-[var(--color-risk-medium)]"
      />
    );
  }
  return (
    <Circle
      size={20}
      className="mt-0.5 shrink-0 text-[var(--color-ink-faint)]"
    />
  );
}
