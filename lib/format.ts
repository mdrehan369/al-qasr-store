const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
  return inr.format(value)
}

export function getDiscountPercent(price: number, comparePrice: number) {
  if (!comparePrice || comparePrice <= price) {
    return null
  }

  return Math.round(((comparePrice - price) / comparePrice) * 100)
}

export function imageKitUrl(url: string, width = 1000) {
  if (!url.includes('ik.imagekit.io')) {
    return url
  }

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}tr=w-${width},q-85`
}

export function productTypeLabel(type: string) {
  if (type === 'aatr') {
    return 'Attar'
  }

  if (type === 'perfume') {
    return 'Perfume'
  }

  return type
}
