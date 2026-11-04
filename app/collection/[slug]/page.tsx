import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft } from "lucide-react";

import { ProductGallery } from "@/components/products/product-gallery";
import { ProductVariantPicker } from "@/components/products/product-variant-picker";
import { VariantSelectionProvider } from "@/components/products/variant-selection-provider";
import {
  ApiError,
  getProductBySlug,
  type ProductDetail,
} from "@/lib/api/products";
import RecommendedProducts from "@/components/collection/recommended-products";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const getProduct = cache(getProductBySlug);

async function getProductOrNotFound(slug: string): Promise<ProductDetail> {
  try {
    return await getProduct(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProduct(slug);
    return {
      title: product.title,
      description: product.details.slice(0, 160),
      alternates: { canonical: `/collection/${product.slug}` },
    };
  } catch {
    return { title: "Fragrance not found" };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductOrNotFound(slug);
  const notes = product.ingredients
    .split(",")
    .map((note) => note.trim())
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" /> The collection
        </Link>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          No. {String(product.id).padStart(2, "0")}
        </span>
      </div>

      <VariantSelectionProvider key={product.id} variants={product.variants}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} title={product.title} />

          <div className="lg:pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              {product.category.name}
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">
              {product.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              {product.details}
            </p>

            <ProductVariantPicker product={product} />

            {notes.length > 0 ? (
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  Ingredients
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {notes.map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/70"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Composed in small batches</span>
              <span>Worldwide enquiries</span>
              <span>Kolkata, West Bengal, India</span>
              <span>Crafted slowly. Worn freely.</span>
            </div>
          </div>
        </div>

        <RecommendedProducts productId={product.id} />
      </VariantSelectionProvider>
    </section>
  );
}
