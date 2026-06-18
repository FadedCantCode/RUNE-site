import Link from "next/link";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm text-[var(--color-ink)]">rune</p>
          <p className="mt-1 text-sm text-[var(--color-ink-faint)]">
            MIT licensed. Built in the open, including the parts that don&apos;t work yet.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="pill pill-yellow px-3 py-1 font-mono-tight text-xs text-[var(--color-ink)]">
            say hi
          </span>
          <Link
            href="https://github.com/FadedCantCode/Fabrica-RUNE"
            className="pill inline-flex h-10 items-center gap-2 border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-4 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-raised-2)]"
          >
            <GithubLogo size={16} />
            Repository
          </Link>
        </div>
      </div>
    </footer>
  );
}
