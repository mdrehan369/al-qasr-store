"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Mail, Phone } from "lucide-react";

import { useProducts } from "@/hooks/use-products";
import { imageKitUrl } from "@/lib/format";

const contactLinks = [
  { label: "Call us", href: "tel:+919876543210", icon: Phone },
  {
    label: "Instagram",
    href: "https://instagram.com/alqasrfragrances",
    icon: Camera,
  },
  { label: "Email", href: "mailto:hello@alqasrfragrances.com", icon: Mail },
];

export function AlQasrStorefront() {
  const productsQuery = useProducts({
    page: 1,
    limit: 3,
    sortBy: "created_at",
    sortOrder: "desc",
  });
  const products = productsQuery.data?.items ?? [];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section
        id="top"
        className="mx-auto grid max-w-7xl items-stretch border-x border-border lg:grid-cols-[0.92fr_1.08fr]"
      >
        <div className="flex flex-col justify-between bg-ivory px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div>
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
              Est. 2024 · Kolkata, West Bengal, India
            </p>
            <h1 className="max-w-xl font-serif text-6xl leading-[0.92] tracking-[-0.05em] text-ink sm:text-8xl">
              Scent is a<br />
              <em className="text-brass">quiet</em> kind
              <br />
              of power.
            </h1>
            <p className="mt-10 max-w-sm text-base leading-7 text-ink/70">
              Contemporary attars and extrait de parfums, composed in small
              batches and made to be remembered.
            </p>
          </div>
          <div className="mt-16 flex items-center gap-5">
            <Link
              href="/collection"
              className="inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink"
            >
              Explore the collection <ArrowUpRight className="size-4" />
            </Link>
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              01 / 04
            </span>
          </div>
        </div>
        <div className="relative min-h-[520px] bg-ink lg:min-h-[680px]">
          <Image
            src="/images/al-qasr-hero.png"
            alt="Al Qasr amber perfume bottle on an ivory silk cloth"
            fill
            priority
            className="object-cover object-center opacity-90"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/80">
            <span className="size-2 rounded-full bg-brass" /> Eau de parfum ·
            50ml
          </div>
        </div>
      </section>

      <section
        id="collection"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
              The edit
            </p>
            <h2 className="font-serif text-5xl tracking-[-0.04em] text-ink sm:text-6xl">
              A wardrobe of <em className="text-brass">memories.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Each composition is an invitation. Find the one that feels like you.
          </p>
        </div>
        {productsQuery.isPending ? (
          <div className="grid gap-x-5 gap-y-14 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] bg-sand" />
                <div className="mt-5 h-8 w-3/4 bg-sand" />
                <div className="mt-3 h-4 w-1/2 bg-sand" />
                <div className="mt-3 h-12 w-full bg-sand" />
              </div>
            ))}
          </div>
        ) : productsQuery.isError ? (
          <div className="border border-border bg-card px-6 py-16 text-center sm:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              Temporarily unavailable
            </p>
            <h3 className="mx-auto mt-5 max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] text-ink">
              The edit could not be loaded.
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Please try again, or browse the full collection.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <button
                type="button"
                onClick={() => productsQuery.refetch()}
                className="border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
              >
                Try again
              </button>
              <Link
                href="/collection"
                className="border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
              >
                View the collection
              </Link>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-x-5 gap-y-14 md:grid-cols-3">
            {products.map((product, index) => {
              const notes =
                product.ingredients
                  .split(",")
                  .map((note) => note.trim())
                  .filter(Boolean)
                  .slice(0, 3)
                  .join(" · ") || product.category;
              const detail =
                product.short_detail?.trim() ||
                "A considered composition from the house of Al Qasr.";

              return (
                <article key={product.id} className="group">
                  <Link
                    href={`/collection/${product.slug}`}
                    className="block"
                    aria-label={`View ${product.title}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                      <Image
                        src={imageKitUrl(product.image_url, 900)}
                        alt={`${product.title} fragrance by Al Qasr`}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${index === 1 ? "object-[70%_center]" : "object-center"}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] text-ivory/80">
                        0{index + 1}
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      <h3 className="font-serif text-3xl text-ink">
                        <Link
                          href={`/collection/${product.slug}`}
                          className="transition-colors hover:text-brass"
                        >
                          {product.title}
                        </Link>
                      </h3>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                        {notes}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                    <Link
                      href={`/collection/${product.slug}`}
                      className="mt-1 rounded-full border border-border p-2 text-ink transition-colors hover:border-brass hover:text-brass"
                      aria-label={`View ${product.title}`}
                    >
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-border bg-card px-6 py-16 text-center sm:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              The edit is being composed
            </p>
            <h3 className="mx-auto mt-5 max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] text-ink">
              New fragrances are on their way.
            </h3>
            <Link
              href="/collection"
              className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
            >
              View the collection <ArrowUpRight className="size-4" />
            </Link>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-sage/20">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-3">
          <div className="border-b border-border px-6 py-14 lg:border-b-0 lg:border-r lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
              01 / Find your note
            </p>
            <h3 className="mt-5 font-serif text-3xl text-ink">Fresh & green</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              For mornings that begin slowly.
            </p>
          </div>
          <div className="border-b border-border px-6 py-14 lg:border-b-0 lg:border-r lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
              02 / Find your note
            </p>
            <h3 className="mt-5 font-serif text-3xl text-ink">Smoky & woody</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              For evenings with a little mystery.
            </p>
          </div>
          <div className="px-6 py-14 lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
              03 / Find your note
            </p>
            <h3 className="mt-5 font-serif text-3xl text-ink">Floral & warm</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              For leaving a soft trace behind.
            </p>
          </div>
        </div>
      </section>

      <section
        id="house"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10 lg:py-32"
      >
        <div className="relative aspect-square overflow-hidden bg-sand">
          <Image
            src="/images/al-qasr-collection.png"
            alt="A selection of Al Qasr perfume bottles"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
        <div className="max-w-xl">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
            The house of Al Qasr
          </p>
          <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl">
            Born from dusk,
            <br />
            <em className="text-brass">made for now.</em>
          </h2>
          <p className="mt-8 text-base leading-8 text-muted-foreground">
            Al Qasr is a study in contrasts: the old-world intimacy of attar,
            translated through a distinctly modern lens. We work with natural
            oils, rare resins, and a deep respect for the ritual of applying
            scent.
          </p>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            No loud launches. No borrowed stories. Just considered fragrances
            for the moments you want to keep close.
          </p>
          <a
            href="https://instagram.com/alqasrfragrances"
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink"
          >
            Meet us on Instagram <Camera className="size-4 text-brass" />
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="bg-ink px-6 py-24 text-ivory lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
              Begin with a conversation
            </p>
            <h2 className="font-serif text-6xl leading-[0.92] tracking-[-0.05em] sm:text-8xl">
              Let us find
              <br />
              <em className="text-brass">your scent.</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-7 text-ivory/65">
              Tell us what you wear, where you are going, or simply what you
              love. We will guide you to a fragrance that feels like home.
            </p>
          </div>
          <div className="mt-14 flex flex-col gap-4 border-t border-ivory/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Instagram" ? "_blank" : undefined}
                rel={label === "Instagram" ? "noreferrer" : undefined}
                className="flex items-center justify-between gap-5 border-b border-ivory/20 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ivory transition-colors hover:text-brass sm:border-b-0"
              >
                <span className="flex items-center gap-3">
                  <Icon className="size-4 text-brass" />
                  {label}
                </span>
                <ArrowUpRight className="size-4" />
              </a>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-ivory/20 pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/40 sm:flex-row">
            <span>Al Qasr Kolkata, West Bengal, India</span>
            <span>Crafted slowly. Worn freely.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
