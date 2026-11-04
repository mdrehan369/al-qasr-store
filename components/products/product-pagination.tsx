'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { Pagination } from '@/lib/api/products'

type ProductPaginationProps = {
  pagination: Pagination
}

function hrefForPage(searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString())
  params.set('page', String(page))
  return `?${params.toString()}`
}

export function ProductPagination({ pagination }: ProductPaginationProps) {
  const searchParams = useSearchParams()

  if (pagination.total_pages <= 1) {
    return null
  }

  return (
    <nav className="mt-16 flex items-center justify-between border-t border-border pt-8" aria-label="Collection pagination">
      {pagination.has_prev ? (
        <Link
          href={hrefForPage(searchParams, pagination.page - 1)}
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-brass"
        >
          <ArrowLeft className="size-4" /> Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/40">
          <ArrowLeft className="size-4" /> Previous
        </span>
      )}

      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {pagination.page} / {pagination.total_pages}
      </span>

      {pagination.has_next ? (
        <Link
          href={hrefForPage(searchParams, pagination.page + 1)}
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-brass"
        >
          Next <ArrowRight className="size-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/40">
          Next <ArrowRight className="size-4" />
        </span>
      )}
    </nav>
  )
}
