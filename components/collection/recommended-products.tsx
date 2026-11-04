'use client'

import { ProductCard } from '@/components/products/product-card'
import { useVariantSelection } from '@/components/products/variant-selection-provider'
import { useRecommendedProducts } from '@/hooks/use-recommended-products'

type RecommendedProductsProps = {
  productId: number
}

export default function RecommendedProducts({
  productId,
}: RecommendedProductsProps) {
  const { selectedVariant } = useVariantSelection()
  const {
    data: recommendations,
    isPending,
    isError,
    refetch,
  } = useRecommendedProducts(productId, selectedVariant?.id ?? 0)

  if (!selectedVariant) {
    return null
  }

  if (!isPending && !isError && recommendations.length === 0) {
    return null
  }

  return (
    <section
      className="mt-20 border-t border-border pt-12 lg:mt-24 lg:pt-16"
      aria-labelledby="recommendations-heading"
    >
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
            You may also like
          </p>
          <h2
            id="recommendations-heading"
            className="font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl"
          >
            Complete the <em className="text-brass">ritual.</em>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-muted-foreground">
          Fragrances chosen to sit beside this composition.
        </p>
      </div>

      {isPending ? (
        <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[4/5] bg-sand" />
              <div className="mt-5 h-3 w-24 bg-sand" />
              <div className="mt-3 h-8 w-2/3 bg-sand" />
              <div className="mt-3 h-12 w-full bg-sand" />
              <div className="mt-4 h-10 w-full border-t border-border bg-sand/40" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="border border-border bg-card px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
            Recommendations unavailable
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            We could not load pairings for this fragrance right now.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-brass"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}
