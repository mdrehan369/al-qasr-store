'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { ProductImage } from '@/lib/api/products'
import { imageKitUrl } from '@/lib/format'
import { cn } from '@/lib/utils'

type ProductGalleryProps = {
  images: ProductImage[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const sortedImages = [...images].sort(
    (a, b) => Number(b.is_primary) - Number(a.is_primary) || a.display_order - b.display_order,
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = sortedImages[activeIndex] ?? sortedImages[0]

  if (!activeImage) {
    return <div className="aspect-square bg-sand" />
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-sand">
        <Image
          src={imageKitUrl(activeImage.image.url, 1400)}
          alt={`${title} — image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <span className="absolute left-4 top-4 bg-background/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/70 backdrop-blur-sm">
          {String(activeIndex + 1).padStart(2, '0')} / {String(sortedImages.length).padStart(2, '0')}
        </span>
      </div>

      {sortedImages.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} of ${title}`}
              aria-pressed={activeIndex === index}
              className={cn(
                'relative aspect-square overflow-hidden border bg-sand transition-colors',
                activeIndex === index ? 'border-brass' : 'border-transparent hover:border-border',
              )}
            >
              <Image
                src={imageKitUrl(image.image.url, 260)}
                alt=""
                fill
                sizes="12vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
