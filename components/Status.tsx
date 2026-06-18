import { CheckCircle, Circle, Warning } from "@phosphor-icons/react/dist/ssr";

// Reflects docs/roadmap.md as of Stage 1's close. Updated to match, not
// left as an aspirational placeholder.
const items = [
  {
    state: "done" as const,
    title: "Spec format and multi-backend runtime",
    body: "The .rune YAML schema, validator, and runtime adapters for OpenAI, Anthropic, Groq, Mistral, and Ollama all run and have been exercised against real tasks, not just malformed-input tests.",
  },
  {
    state: "done" as const,
    title: "Semantic divergence measurement",
    body: "Switched from word-overlap (Jaccard) to embedding-based semantic similarity, after confirming the original proxy penalized backends for saying the same thing in different words.",
  },
  {
    state: "done" as const,
    title: "Stage 1 validation, on research.rune and coder.rune",
    body: "Three independent cross-provider runs on research.rune (correlations 0.719, 0.99, 0.999) and one on coder.rune (0.967, after fixing a real context-dependent scoring gap) all show the linter's predictions tracking real measured divergence.",
  },
  {
    state: "open" as const,
    title: "Repeated steps and format-anchoring constraints",
    body: "Genomes with a repeated step, or with a constraint that forces a specific output shape, expose real gaps the base heuristic doesn't fully resolve yet. Two structural fixes landed today; one open question (a single step's prediction staying off in this genome family) remains documented, not hidden.",
  },
  {
    state: "not-started" as const,
    title: "Sample size beyond 12 tasks",
    body: "Every result above is still built on 12 tasks and largely one backend pairing. Scaling that up is the next concrete step before any claim stronger than \"shows real signal on these genome shapes\" is warranted.",
  },
];

const STATE_PILL: Record<typeof items[number]["state"], "pill-lavender" | "pill-yellow" | "pill-gray"> = {
  done: "pill-lavender",
  open: "pill-yellow",
  "not-started": "pill-gray",
};

export function Status() {
  return (
    <section id="status" className="border-b border-[var(--color-border)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">
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
                  <StatusIcon state={item.state} pillColor={STATE_PILL[item.state]} />
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

// Status reads through icon shape inside a decorative pastel pill, the
// same device used for the icon badges in HowItWorks, never a literal
// red/amber/green severity scale.
function StatusIcon({
  state,
  pillColor,
}: {
  state: "done" | "open" | "not-started";
  pillColor: "pill-lavender" | "pill-yellow" | "pill-gray";
}) {
  const icon =
    state === "done" ? (
      <CheckCircle size={16} weight="fill" />
    ) : state === "open" ? (
      <Warning size={16} weight="fill" />
    ) : (
      <Circle size={16} />
    );

  return (
    <span
      className={`pill ${pillColor} mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-[var(--color-ink)]`}
    >
      {icon}
    </span>
  );
}
