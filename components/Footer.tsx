import Link from "next/link";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono-tight text-sm uppercase tracking-wide text-[var(--color-ink)]">rune</p>
          <p className="mt-1 text-sm text-[var(--color-ink-faint)]">
            MIT licensed. Built in the open, including the parts that don&apos;t work yet.
          </p>
        </div>

        <Link
          href="https://github.com/FadedCantCode/Fabrica-RUNE"
          className="inline-flex h-10 items-center gap-2 border border-[var(--color-border-strong)] px-4 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]"
        >
          <GithubLogo size={16} />
          Repository
        </Link>
      </div>
    </footer>
  );
}
