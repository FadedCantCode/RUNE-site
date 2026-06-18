import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link
          href="/"
          className="flex h-10 w-14 items-center justify-center rounded-[10px] bg-[var(--color-ink)] font-display text-sm text-[var(--color-bg)]"
        >
          R:\
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="#how-it-works"
            className="pill hidden items-center border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-4 py-2 text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] md:inline-flex"
          >
            How it works
          </Link>
          <Link
            href="#status"
            className="pill hidden items-center border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-4 py-2 text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] md:inline-flex"
          >
            Status
          </Link>
          <Link
            href="https://github.com/FadedCantCode/Fabrica-RUNE"
            className="pill inline-flex items-center bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-85"
          >
            GitHub
          </Link>
        </div>
      </nav>
    </header>
  );
}
