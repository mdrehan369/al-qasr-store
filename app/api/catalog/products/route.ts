import { type NextRequest, NextResponse } from 'next/server'

import { ApiError, parseProductQuery } from '@/lib/api/catalog'
import { getProducts } from '@/lib/api/products'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const query = parseProductQuery(request.nextUrl.searchParams)
    const data = await getProducts(query)

    return NextResponse.json(data)
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500
    const message = error instanceof Error ? error.message : 'Unable to load fragrances.'

    return NextResponse.json({ message }, { status })
  }
}
