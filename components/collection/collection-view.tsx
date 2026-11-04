"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductPagination } from "@/components/products/product-pagination";
import {
  collectionFiltersToQuery,
  parseCollectionFilters,
} from "@/lib/collection";
import { useCategories, useProducts } from "@/hooks/use-products";

export function CollectionView() {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const filters = useMemo(
    () => parseCollectionFilters(new URLSearchParams(searchParamsString)),
    [searchParamsString],
  );
  const query = useMemo(() => collectionFiltersToQuery(filters), [filters]);

  const productsQuery = useProducts(query);
  const categoriesQuery = useCategories();

  const result = productsQuery.data;
  const categories = categoriesQuery.data ?? [];
  const activeCategories = categories.filter(
    (category) => category.product_count > 0,
  );
  const offset = result
    ? (result.pagination.page - 1) * result.pagination.limit
    : 0;
  const isRefreshing = productsQuery.isFetching && !productsQuery.isPending;

  return (
    <>
      <section className="border-b border-border bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-10 lg:py-24">
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
              The collection
            </p>
            <h1 className="font-serif text-6xl leading-[0.9] tracking-[-0.05em] text-ink sm:text-8xl">
              Perfume &<br />
              <em className="text-brass">attar.</em>
            </h1>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="text-base leading-7 text-ink/65">
              A study in old-world intimacy and modern restraint. Discover
              compositions built around rare resins, natural oils, and the quiet
              ritual of wearing scent.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Small batch</span>
              <span>Kolkata, West Bengal, India</span>
              <span>Worldwide enquiries</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <Suspense
          fallback={
            <div className="h-36 animate-pulse border-b border-border" />
          }
        >
          <ProductFilters
            categories={activeCategories}
            total={result?.pagination.total ?? 0}
            current={{
              q: filters.q,
              categoryIds: filters.categoryIds,
              type: filters.type,
              sort: filters.sort,
            }}
          />
        </Suspense>

        {productsQuery.isPending ? (
          <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] bg-sand" />
                <div className="mt-5 h-4 w-24 bg-sand" />
                <div className="mt-3 h-8 w-2/3 bg-sand" />
                <div className="mt-3 h-12 w-full bg-sand" />
                <div className="mt-4 h-10 w-full border-t border-border bg-sand/40" />
              </div>
            ))}
          </div>
        ) : productsQuery.isError && !result ? (
          <div className="mt-12 border border-border bg-card px-6 py-20 text-center sm:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              Temporarily unavailable
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] text-ink sm:text-5xl">
              The catalogue could not be loaded.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Please try again in a moment or adjust your filters.
            </p>
            <button
              type="button"
              onClick={() => productsQuery.refetch()}
              className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
            >
              Try again
            </button>
          </div>
        ) : result && result.items.length > 0 ? (
          <div
            className={`mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 ${isRefreshing ? "opacity-70" : ""}`}
          >
            {result.items.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={offset + index}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-border bg-card px-6 py-20 text-center sm:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              No matches
            </p>
            <h2 className="mx-auto mt-5 max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] text-ink sm:text-5xl">
              Nothing in this corner of the house.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Try another note, category, or clear the filters to see the full
              collection.
            </p>
            <Link
              href="/collection"
              className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
            >
              View the full collection
            </Link>
          </div>
        )}

        {result ? (
          <Suspense fallback={null}>
            <ProductPagination pagination={result.pagination} />
          </Suspense>
        ) : null}
      </section>
    </>
  );
}
