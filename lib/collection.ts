import type { ProductQuery, ProductType, SortBy, SortOrder } from '@/lib/api/products'

export const COLLECTION_PAGE_SIZE = 12

export type CollectionSort = 'newest' | 'oldest' | 'price-asc' | 'price-desc'

export type CollectionFilters = {
  page: number
  q: string
  categoryIds: number[]
  type: ProductType | null
  sort: CollectionSort
}

type SearchParamsLike = {
  get(name: string): string | null
  getAll(name: string): string[]
}

export const collectionSortOptions: Array<{ value: CollectionSort; label: string }> = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'price-asc', label: 'Price · low to high' },
  { value: 'price-desc', label: 'Price · high to low' },
]

export const collectionSortConfig: Record<CollectionSort, { sortBy: SortBy; sortOrder: SortOrder }> = {
  newest: { sortBy: 'created_at', sortOrder: 'desc' },
  oldest: { sortBy: 'created_at', sortOrder: 'asc' },
  'price-asc': { sortBy: 'min_price', sortOrder: 'asc' },
  'price-desc': { sortBy: 'min_price', sortOrder: 'desc' },
}

export function parseCollectionSort(value: string | null | undefined): CollectionSort {
  if (value === 'oldest' || value === 'price-asc' || value === 'price-desc') {
    return value
  }

  return 'newest'
}

export function parseCollectionFilters(searchParams: SearchParamsLike): CollectionFilters {
  const pageValue = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(pageValue) && pageValue > 0 ? Math.floor(pageValue) : 1
  const q = (searchParams.get('q') ?? '').trim().slice(0, 100)
  const categoryIds = [
    ...new Set(
      searchParams
        .getAll('category')
        .map(Number)
        .filter((id) => Number.isInteger(id) && id > 0),
    ),
  ]
  const typeValue = searchParams.get('type')
  const type = typeValue === 'perfume' || typeValue === 'aatr' ? typeValue : null
  const sort = parseCollectionSort(searchParams.get('sort'))

  return { page, q, categoryIds, type, sort }
}

export function collectionFiltersToQuery(filters: CollectionFilters): ProductQuery {
  return {
    page: filters.page,
    limit: COLLECTION_PAGE_SIZE,
    search: filters.q,
    categoryIds: filters.categoryIds,
    productTypes: filters.type ? [filters.type] : [],
    ...collectionSortConfig[filters.sort],
  }
}

export function toURLSearchParams(params: Record<string, string | string[] | undefined>) {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, item)
      }
    } else if (value !== undefined) {
      searchParams.set(key, value)
    }
  }

  return searchParams
}
