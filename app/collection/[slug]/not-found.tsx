import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">Not in the collection</p>
      <h1 className="mt-5 font-serif text-5xl leading-tight tracking-[-0.04em] text-ink sm:text-6xl">
        This scent has moved on.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
        The fragrance you are looking for is no longer available, or the link has changed.
      </p>
      <Link
        href="/collection"
        className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
      >
        Return to the collection
      </Link>
    </section>
  )
}
