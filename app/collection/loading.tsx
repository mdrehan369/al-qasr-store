export default function CollectionLoading() {
  return (
    <>
      <section className="border-b border-border bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-10 lg:py-24">
          <div>
            <div className="mb-6 h-3 w-28 animate-pulse rounded-full bg-sand" />
            <div className="h-20 w-4/5 animate-pulse rounded-sm bg-sand sm:h-24" />
            <div className="mt-3 h-20 w-3/5 animate-pulse rounded-sm bg-sand sm:h-24" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-full bg-sand" />
            <div className="h-4 w-11/12 animate-pulse rounded-full bg-sand" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-sand" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="h-24 animate-pulse border-b border-border" />
        <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[4/5] animate-pulse bg-sand" />
              <div className="mt-5 h-3 w-24 animate-pulse rounded-full bg-sand" />
              <div className="mt-3 h-8 w-3/4 animate-pulse rounded-sm bg-sand" />
              <div className="mt-4 h-3 w-full animate-pulse rounded-full bg-sand" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded-full bg-sand" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
