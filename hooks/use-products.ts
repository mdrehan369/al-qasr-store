'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { catalogFetch } from '@/lib/api/catalog-client'
import {
  buildProductSearchParams,
  categoryKeys,
  productKeys,
  type Category,
  type ProductListResult,
  type ProductQuery,
} from '@/lib/api/catalog'

export function useProducts(query: ProductQuery = {}) {
  return useQuery({
    queryKey: productKeys.list(query),
    queryFn: () =>
      catalogFetch<ProductListResult>(`/api/catalog/products?${buildProductSearchParams(query).toString()}`),
    placeholderData: keepPreviousData,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => catalogFetch<Category[]>('/api/catalog/categories'),
  })
}
