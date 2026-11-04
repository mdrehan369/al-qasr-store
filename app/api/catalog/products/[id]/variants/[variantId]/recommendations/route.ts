import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/catalog";
import { getRecommendedProducts } from "@/lib/api/products";

export const dynamic = "force-dynamic";

type RecommendationRouteProps = {
  params: Promise<{ id: string; variantId: string }>;
};

export async function GET(
  _request: Request,
  { params }: RecommendationRouteProps,
) {
  const { id, variantId } = await params;
  const productId = Number(id);
  const variantIdValue = Number(variantId);

  if (
    !Number.isInteger(productId) ||
    productId <= 0 ||
    !Number.isInteger(variantIdValue) ||
    variantIdValue <= 0
  ) {
    return NextResponse.json(
      { message: "Invalid product or variant id." },
      { status: 400 },
    );
  }

  try {
    const data = await getRecommendedProducts(productId, variantIdValue);

    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 500;
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load recommendations.";

    return NextResponse.json({ message }, { status });
  }
}
