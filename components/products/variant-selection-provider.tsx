'use client'

import { createContext, useContext, useMemo, useState } from 'react'

import type { ProductType, ProductVariant } from '@/lib/api/products'

type VariantSelectionContextValue = {
  variants: ProductVariant[]
  types: ProductType[]
  selectedVariant: ProductVariant | null
  selectedType: ProductType | null
  selectVariant: (id: number) => void
  selectType: (type: ProductType) => void
}

const VariantSelectionContext = createContext<VariantSelectionContextValue | null>(null)

const productTypeOrder: ProductType[] = ['perfume', 'aatr']

function defaultVariantId(variants: ProductVariant[]) {
  return variants.find((variant) => variant.stock > 0)?.id ?? variants[0]?.id ?? null
}

export function VariantSelectionProvider({
  variants,
  children,
}: {
  variants: ProductVariant[]
  children: React.ReactNode
}) {
  const [selectedId, setSelectedId] = useState<number | null>(() => defaultVariantId(variants))
  const selectedVariant = variants.find((variant) => variant.id === selectedId) ?? variants[0] ?? null
  const types = useMemo(() => {
    const present = new Set(variants.map((variant) => variant.product_type))
    return productTypeOrder.filter((type) => present.has(type))
  }, [variants])

  const selectType = (type: ProductType) => {
    const nextVariant =
      variants.find((variant) => variant.product_type === type && variant.stock > 0) ??
      variants.find((variant) => variant.product_type === type)

    if (nextVariant) {
      setSelectedId(nextVariant.id)
    }
  }

  const value: VariantSelectionContextValue = {
    variants,
    types,
    selectedVariant,
    selectedType: selectedVariant?.product_type ?? null,
    selectVariant: setSelectedId,
    selectType,
  }

  return <VariantSelectionContext.Provider value={value}>{children}</VariantSelectionContext.Provider>
}

export function useVariantSelection() {
  const context = useContext(VariantSelectionContext)

  if (!context) {
    throw new Error('useVariantSelection must be used within VariantSelectionProvider')
  }

  return context
}
