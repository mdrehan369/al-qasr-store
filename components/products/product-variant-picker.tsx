'use client'

import { Mail, Phone } from 'lucide-react'

import { useVariantSelection } from '@/components/products/variant-selection-provider'
import type { ProductDetail, ProductVariant } from '@/lib/api/products'
import { formatPrice, getDiscountPercent, productTypeLabel } from '@/lib/format'
import { cn } from '@/lib/utils'

type ProductVariantPickerProps = {
  product: ProductDetail
}

function variantSize(variant: ProductVariant) {
  return `${variant.size} ${variant.unit}`
}

function variantFromPrice(variants: ProductVariant[]) {
  return Math.min(...variants.map((variant) => variant.price))
}

export function ProductVariantPicker({ product }: ProductVariantPickerProps) {
  const { variants, types, selectedVariant, selectedType, selectVariant, selectType } =
    useVariantSelection()

  if (!selectedVariant) {
    return null
  }

  const selectedTypeVariants = variants.filter(
    (variant) => variant.product_type === selectedVariant.product_type,
  )
  const discount = getDiscountPercent(selectedVariant.price, selectedVariant.compare_price)
  const subject = encodeURIComponent(
    `Enquiry: ${product.title} · ${productTypeLabel(selectedVariant.product_type)} · ${variantSize(selectedVariant)}`,
  )
  const stockLabel =
    selectedVariant.stock <= 0
      ? 'Sold out'
      : selectedVariant.stock <= 5
        ? `Only ${selectedVariant.stock} left`
        : 'In stock'

  return (
    <div className="mt-10 border-t border-border pt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            Selected composition
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-brass">
            {productTypeLabel(selectedVariant.product_type)} · {variantSize(selectedVariant)}
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-2xl tracking-tight text-ink">{formatPrice(selectedVariant.price)}</span>
            {discount ? (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(selectedVariant.compare_price)}
              </span>
            ) : null}
            {discount ? (
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brass">
                -{discount}%
              </span>
            ) : null}
          </div>
        </div>
        <span
          className={cn(
            'font-mono text-[9px] uppercase tracking-[0.16em]',
            selectedVariant.stock > 0 ? 'text-brass' : 'text-muted-foreground',
          )}
        >
          {stockLabel}
        </span>
      </div>

      <div className="mt-7 space-y-6">
        {types.length > 1 ? (
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Choose your composition
            </p>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Choose perfume or attar">
              {types.map((type) => {
                const typeVariants = variants.filter((variant) => variant.product_type === type)
                const active = type === selectedType
                const available = typeVariants.some((variant) => variant.stock > 0)

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => selectType(type)}
                    aria-pressed={active}
                    className={cn(
                      'flex flex-col items-start gap-1 border px-4 py-3 text-left transition-colors',
                      active
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-border text-ink hover:border-ink',
                      !available && !active && 'opacity-60',
                    )}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                      {productTypeLabel(type)}
                    </span>
                    <span
                      className={cn(
                        'text-sm tracking-tight',
                        active ? 'text-ivory/75' : 'text-muted-foreground',
                      )}
                    >
                      From {formatPrice(variantFromPrice(typeVariants))}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[8px] uppercase tracking-[0.14em]',
                        active ? 'text-ivory/50' : 'text-muted-foreground/80',
                      )}
                    >
                      {available
                        ? `${typeVariants.length} ${typeVariants.length === 1 ? 'size' : 'sizes'}`
                        : 'Sold out'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            {productTypeLabel(selectedVariant.product_type)}
          </p>
        )}

        <div>
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            Choose your size
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a size">
            {selectedTypeVariants.map((variant) => {
              const active = variant.id === selectedVariant.id

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => selectVariant(variant.id)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors',
                    active
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-border text-muted-foreground hover:border-ink hover:text-ink',
                    variant.stock <= 0 && !active && 'opacity-50',
                  )}
                >
                  {variantSize(variant)}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={`mailto:hello@alqasrfragrances.com?subject=${subject}`}
          className="inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-ink bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-brass hover:bg-brass"
        >
          <Mail className="size-4" /> Enquire about this size
        </a>
        <a
          href="tel:+919876543210"
          className="inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-brass hover:text-brass"
        >
          <Phone className="size-4" /> Speak to us
        </a>
      </div>
    </div>
  )
}
