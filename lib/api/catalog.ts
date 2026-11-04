export type ProductType = "perfume" | "aatr";
export type SortBy = "min_price" | "max_price" | "created_at";
export type SortOrder = "asc" | "desc";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

export type ProductListItem = {
  id: number;
  title: string;
  short_detail: string;
  created_at: string;
  category: string;
  ingredients: string;
  slug: string;
  min_price: number;
  max_price: number;
  compare_price: number;
  total_stock: number;
  image_url: string;
  image_id: number;
  variant_count: number;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
  product_count: number;
};

export type ProductVariant = {
  id: number;
  size: number;
  unit: string;
  price: number;
  compare_price: number;
  stock: number;
  product_type: ProductType;
};

export type ProductImage = {
  id: number;
  display_order: number;
  is_primary: boolean;
  image: {
    id: number;
    file_id: string;
    url: string;
    file_path: string;
  };
};

export type ProductDetail = {
  id: number;
  title: string;
  ingredients: string;
  details: string;
  is_active: boolean;
  category_id: number;
  created_at: string;
  category: {
    id: number;
    name: string;
    created_at: string;
  };
  slug: string;
  variants: ProductVariant[];
  images: ProductImage[];
};

export type ProductListResult = {
  items: ProductListItem[];
  pagination: Pagination;
};

export type ProductQuery = {
  page?: number;
  limit?: number;
  search?: string;
  categoryIds?: number[];
  productTypes?: ProductType[];
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type SearchParamsLike = {
  get(name: string): string | null;
  getAll(name: string): string[];
};

const PRODUCT_TYPES: ProductType[] = ["perfume", "aatr"];
const SORT_BY_VALUES: SortBy[] = ["created_at", "min_price", "max_price"];

export function buildProductSearchParams(query: ProductQuery = {}) {
  const params = new URLSearchParams();
  const page = query.page ?? 1;
  const limit = query.limit ?? 12;

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (query.search?.trim()) {
    params.set("search", query.search.trim());
  }

  for (const categoryId of query.categoryIds ?? []) {
    if (Number.isInteger(categoryId) && categoryId > 0) {
      params.append("category_ids", String(categoryId));
    }
  }

  for (const productType of query.productTypes ?? []) {
    params.append("product_types", productType);
  }

  if (query.sortBy) {
    params.set("sort_by", query.sortBy);
  }

  if (query.sortOrder) {
    params.set("sort_order", query.sortOrder);
  }

  return params;
}

export function parseProductQuery(
  searchParams: SearchParamsLike,
): ProductQuery {
  const pageValue = Number(searchParams.get("page") ?? 1);
  const limitValue = Number(searchParams.get("limit") ?? 12);
  const page =
    Number.isFinite(pageValue) && pageValue > 0 ? Math.floor(pageValue) : 1;
  const limit =
    Number.isFinite(limitValue) && limitValue > 0
      ? Math.min(Math.floor(limitValue), 100)
      : 12;
  const search = (searchParams.get("search") ?? "").trim().slice(0, 100);
  const categoryIds = [
    ...new Set(
      searchParams
        .getAll("category_ids")
        .map(Number)
        .filter((id) => Number.isInteger(id) && id > 0),
    ),
  ];
  const productTypes = searchParams
    .getAll("product_types")
    .filter((value): value is ProductType =>
      PRODUCT_TYPES.includes(value as ProductType),
    );
  const sortByValue = searchParams.get("sort_by");
  const sortOrderValue = searchParams.get("sort_order");
  const sortBy = SORT_BY_VALUES.includes(sortByValue as SortBy)
    ? (sortByValue as SortBy)
    : undefined;
  const sortOrder =
    sortOrderValue === "asc" || sortOrderValue === "desc"
      ? sortOrderValue
      : undefined;

  return {
    page,
    limit,
    search,
    categoryIds,
    productTypes,
    sortBy,
    sortOrder,
  };
}

const productListKey = ["products", "list"] as const;
const categoryListKey = ["categories", "list"] as const;
const recommendationListKey = ["products", "recommendations"] as const;

export const productKeys = {
  all: ["products"] as const,
  list: (query: ProductQuery = {}) =>
    [...productListKey, buildProductSearchParams(query).toString()] as const,
};

export const categoryKeys = {
  all: categoryListKey,
};

export const recommendationKeys = {
  all: recommendationListKey,
  detail: (productId: number, variantId: number) =>
    [...recommendationListKey, productId, variantId] as const,
};
