import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-mono-tight text-[15px] font-medium text-[var(--color-ink)]">
            rune
          </span>
          <span className="hidden text-xs text-[var(--color-ink-faint)] sm:inline">
            divergence linter
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="#how-it-works"
            className="hidden text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] md:inline"
          >
            How it works
          </Link>
          <Link
            href="#status"
            className="hidden text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] md:inline"
          >
            Status
          </Link>
          <Link
            href="https://github.com"
            className="inline-flex h-9 items-center rounded-[var(--radius-base)] border border-[var(--color-border-strong)] px-4 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
          >
            GitHub
          </Link>
        </div>
      </nav>
    </header>
  );
}
