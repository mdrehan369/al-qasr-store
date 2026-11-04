'use client'

import { useQuery } from '@tanstack/react-query'

import { catalogFetch } from '@/lib/api/catalog-client'
import {
  recommendationKeys,
  type ProductListItem,
} from '@/lib/api/catalog'

export function useRecommendedProducts(productId: number, variantId: number) {
  return useQuery({
    queryKey: recommendationKeys.detail(productId, variantId),
    queryFn: () =>
      catalogFetch<ProductListItem[]>(
        `/api/catalog/products/${productId}/variants/${variantId}/recommendations`,
      ),
    enabled:
      Number.isInteger(productId) &&
      productId > 0 &&
      Number.isInteger(variantId) &&
      variantId > 0,
  })
}
