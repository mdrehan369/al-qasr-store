import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { CollectionView } from "@/components/collection/collection-view";
import { categoryKeys, productKeys } from "@/lib/api/catalog";
import { getCategories, getProducts } from "@/lib/api/products";
import {
  collectionFiltersToQuery,
  parseCollectionFilters,
  toURLSearchParams,
} from "@/lib/collection";
import { createQueryClient } from "@/lib/query-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Explore Al Qasr perfumes and attars, composed in small batches in Kolkata, West Bengal, India.",
  alternates: { canonical: "/collection" },
};

type CollectionSearchParams = {
  page?: string | string[];
  q?: string | string[];
  type?: string | string[];
  category?: string | string[];
  sort?: string | string[];
};

type CollectionPageProps = {
  searchParams: Promise<CollectionSearchParams>;
};

export default async function CollectionPage({
  searchParams,
}: CollectionPageProps) {
  const filters = parseCollectionFilters(toURLSearchParams(await searchParams));
  const query = collectionFiltersToQuery(filters);
  const queryClient = createQueryClient();

  // prefetch
  await Promise.all([
    queryClient.query({
      queryKey: productKeys.list(query),
      queryFn: () => getProducts(query),
    }),
    queryClient.query({
      queryKey: categoryKeys.all,
      queryFn: getCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <CollectionView />
      </Suspense>
    </HydrationBoundary>
  );
}
