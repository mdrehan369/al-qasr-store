'use client'

import Link from 'next/link'

export default function CollectionError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">Catalogue unavailable</p>
      <h1 className="mt-5 font-serif text-5xl leading-tight tracking-[-0.04em] text-ink sm:text-6xl">
        The house is resting.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
        We could not reach the fragrance catalogue just now. Please try again in a moment.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-ink bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-brass hover:bg-brass"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-brass"
        >
          Return home
        </Link>
      </div>
    </section>
  )
}
