import {
  ApiError,
  buildProductSearchParams,
  ProductListItem,
  type ApiResponse,
  type Category,
  type ProductDetail,
  type ProductListResult,
  type ProductQuery,
} from "./catalog";

export { ApiError } from "./catalog";
export type {
  ApiResponse,
  Category,
  Pagination,
  ProductDetail,
  ProductImage,
  ProductListItem,
  ProductListResult,
  ProductQuery,
  ProductType,
  ProductVariant,
  SortBy,
  SortOrder,
} from "./catalog";

const API_BASE_URL = (
  process.env.API_BASE_URL ?? "http://localhost:8000"
).replace(/\/$/, "");

async function apiFetch<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  } catch {
    throw new ApiError(
      "The fragrance catalogue is temporarily unavailable.",
      503,
    );
  }

  if (!response.ok) {
    throw new ApiError(
      "The fragrance catalogue is temporarily unavailable.",
      response.status,
    );
  }

  const payload = (await response.json()) as ApiResponse<T>;

  if (!payload.success || payload.data === null) {
    throw new ApiError(
      payload.message || "Unable to load fragrances.",
      response.status,
    );
  }

  return payload.data;
}

export function getProducts(query: ProductQuery = {}) {
  return apiFetch<ProductListResult>(
    `/api/v1/products/?${buildProductSearchParams(query).toString()}`,
  );
}

export function getCategories() {
  return apiFetch<Category[]>("/api/v1/categories/");
}

export function getProductBySlug(slug: string) {
  return apiFetch<ProductDetail>(
    `/api/v1/products/slug/${encodeURIComponent(slug)}`,
  );
}

export function getRecommendedProducts(product_id: number, variant_id: number) {
  return apiFetch<ProductListItem[]>(
    `/api/v1/products/${product_id}/variants/${variant_id}/recommendations`,
  );
}
