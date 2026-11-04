import { NextResponse } from 'next/server'

import { ApiError } from '@/lib/api/catalog'
import { getCategories } from '@/lib/api/products'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getCategories()

    return NextResponse.json(data)
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500
    const message = error instanceof Error ? error.message : 'Unable to load categories.'

    return NextResponse.json({ message }, { status })
  }
}
