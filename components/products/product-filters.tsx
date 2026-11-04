'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Search, X } from 'lucide-react'
import { useCallback, useEffect, useState, useTransition } from 'react'

import type { Category, ProductType } from '@/lib/api/products'
import { collectionSortOptions, type CollectionSort } from '@/lib/collection'
import { cn } from '@/lib/utils'

type ProductFiltersProps = {
  categories: Category[]
  total: number
  current: {
    q: string
    categoryIds: number[]
    type: ProductType | null
    sort: CollectionSort
  }
}

const typeOptions: Array<{ value: ProductType | null; label: string }> = [
  { value: null, label: 'All' },
  { value: 'perfume', label: 'Perfume' },
  { value: 'aatr', label: 'Attar' },
]

export function ProductFilters({ categories, total, current }: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchQuery, setSearchQuery] = useState(current.q)

  const updateParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString())
      mutate(params)
      params.delete('page')

      const queryString = params.toString()
      startTransition(() => {
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
      })
    },
    [pathname, router, searchParams],
  )

  useEffect(() => {
    setSearchQuery(current.q)
  }, [current.q])

  useEffect(() => {
    if (searchQuery === current.q) {
      return
    }

    const timer = setTimeout(() => {
      updateParams((params) => {
        if (searchQuery.trim()) {
          params.set('q', searchQuery.trim())
        } else {
          params.delete('q')
        }
      })
    }, 400)

    return () => clearTimeout(timer)
  }, [current.q, searchQuery, updateParams])

  const toggleCategory = (categoryId: number) => {
    const nextCategoryIds = current.categoryIds.includes(categoryId)
      ? current.categoryIds.filter((id) => id !== categoryId)
      : [...current.categoryIds, categoryId]

    updateParams((params) => {
      params.delete('category')
      for (const id of nextCategoryIds) {
        params.append('category', String(id))
      }
    })
  }

  const setType = (type: ProductType | null) => {
    updateParams((params) => {
      if (type) {
        params.set('type', type)
      } else {
        params.delete('type')
      }
    })
  }

  const setSort = (sort: CollectionSort) => {
    updateParams((params) => {
      if (sort === 'newest') {
        params.delete('sort')
      } else {
        params.set('sort', sort)
      }
    })
  }

  const hasFilters = Boolean(current.q) || current.categoryIds.length > 0 || Boolean(current.type) || current.sort !== 'newest'

  return (
    <div className={cn('transition-opacity', isPending && 'opacity-60')}>
      <div className="flex flex-col gap-6 border-b border-border pb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by product type">
            {typeOptions.map((option) => {
              const active = current.type === option.value
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setType(option.value)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors',
                    active
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-border text-muted-foreground hover:border-ink hover:text-ink',
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form
              role="search"
              onSubmit={(event) => {
                event.preventDefault()
                updateParams((params) => {
                  if (searchQuery.trim()) {
                    params.set('q', searchQuery.trim())
                  } else {
                    params.delete('q')
                  }
                })
              }}
              className="relative"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name"
                aria-label="Search fragrances by name"
                className="h-10 w-full rounded-full border border-border bg-background pl-9 pr-9 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brass sm:w-64"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </form>

            <div className="relative">
              <select
                value={current.sort}
                onChange={(event) => setSort(event.target.value as CollectionSort)}
                aria-label="Sort fragrances"
                className="h-10 w-full appearance-none rounded-full border border-border bg-background pl-4 pr-9 font-mono text-[10px] uppercase tracking-[0.14em] text-ink outline-none transition-colors focus:border-brass sm:w-52"
              >
                {collectionSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((category) => {
              const active = current.categoryIds.includes(category.id)
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  aria-pressed={active}
                  className={cn(
                    'shrink-0 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors',
                    active
                      ? 'border-brass bg-brass/10 text-ink'
                      : 'border-border text-muted-foreground hover:border-brass hover:text-ink',
                  )}
                >
                  {category.name}
                  <span className="ml-2 text-[8px] opacity-60">{category.product_count}</span>
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              {total} {total === 1 ? 'fragrance' : 'fragrances'}
            </span>
            {hasFilters ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  startTransition(() => router.push(pathname, { scroll: false }))
                }}
                className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
