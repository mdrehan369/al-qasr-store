import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { ProductListItem } from '@/lib/api/products'
import { formatPrice, getDiscountPercent, imageKitUrl } from '@/lib/format'

type ProductCardProps = {
  product: ProductListItem
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const discount = getDiscountPercent(product.max_price, product.compare_price)
  const hasRange = product.max_price > product.min_price
  const soldOut = product.total_stock <= 0
  const description = product.short_detail?.trim() || product.ingredients?.trim()

  return (
    <article className="group">
      <Link href={`/collection/${product.slug}`} className="block" aria-label={`View ${product.title}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={imageKitUrl(product.image_url, 900)}
            alt={`${product.title} by Al Qasr`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <span className="bg-background/85 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-ink/70 backdrop-blur-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col items-end gap-2">
              {discount ? (
                <span className="bg-brass px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory">
                  Up to {discount}% off
                </span>
              ) : null}
              {soldOut ? (
                <span className="bg-ink px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory">
                  Sold out
                </span>
              ) : null}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between bg-linear-to-t from-ink/55 to-transparent px-4 pb-4 pt-12 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/85">
            <span>{product.variant_count} {product.variant_count === 1 ? 'size' : 'sizes'}</span>
            <span>{soldOut ? 'Enquire' : 'View'}</span>
          </div>
        </div>

        <div className="pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass">{product.category}</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h2 className="font-serif text-3xl leading-none tracking-[-0.02em] text-ink">{product.title}</h2>
            <span className="mt-1 shrink-0 rounded-full border border-border p-2 text-ink transition-colors group-hover:border-brass group-hover:text-brass">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          {description ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{description}</p> : null}
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-border pt-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {hasRange ? 'Price range' : 'Price'}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-lg tracking-tight text-ink">{formatPrice(product.min_price)}</span>
                {hasRange ? (
                  <span className="text-xs text-muted-foreground">– {formatPrice(product.max_price)}</span>
                ) : null}
              </div>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              {product.ingredients?.split(',')[0]?.trim() || 'Al Qasr'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
