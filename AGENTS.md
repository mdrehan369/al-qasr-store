# AGENTS.md

## Project
Marketing site for Al Qasr perfume: Next.js 16 App Router, React 19, Tailwind CSS v4,
shadcn (`base-nova` style on Base UI). The catalogue is served by an external FastAPI
backend; there is no cart or checkout — CTAs are `tel:`, `mailto:`, and Instagram links.

## Commands
- `pnpm install` — use pnpm. `pnpm-lock.yaml` is the active lockfile.
- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm exec tsc --noEmit` — the only real typecheck. `next.config.mjs` sets
  `typescript.ignoreBuildErrors: true`, so a successful build does NOT mean types pass.
- There is no lint, formatter, test suite, or CI configured. Do not invent commands.

## Structure
- `app/page.tsx` — home; renders `<AlQasrStorefront />`.
- `app/events/page.tsx` — static events/stall booking page with `tel:`, `mailto:`,
  and Instagram CTAs; local event imagery lives in `public/images/events/`.
- `app/collection/` — `/collection` listing and `/collection/[slug]` detail, both
  server components (`force-dynamic`). `layout.tsx` adds shared header/footer.
- `components/al-qasr-storefront.tsx` — home page content; `'use client'`; fetches the
  newest three products with `useProducts`.
- `components/collection/` — listing view, filters, pagination, and
  `recommended-products.tsx`.
- `components/products/` — listing card, gallery, variant picker, and
  `variant-selection-provider.tsx`.
- `components/providers/query-provider.tsx` — client TanStack Query provider.
- `components/site-header.tsx` / `site-footer.tsx` — shared chrome for non-home routes.
- `lib/api/products.ts` — server-only catalogue fetchers, including recommendations.
- `lib/api/catalog.ts` — shared types, query-key factories, search-param helpers, and
  `ApiError`; `lib/api/catalog-client.ts` — browser fetch wrapper for the Next proxy.
- `app/api/catalog/` — same-origin proxies for products, categories, and variant
  recommendations; these are the only catalogue paths the browser calls directly.
- `hooks/use-products.ts` / `hooks/use-recommended-products.ts` — React Query hooks.
- `lib/query-client.ts` — shared `QueryClient` defaults.
- `lib/collection.ts` — sort/filter config; `lib/format.ts` — INR and ImageKit helpers.
- `components/ui/` — shadcn primitives; `lib/utils.ts` exposes `cn()`.
- `app/globals.css` — all design tokens and global styles.
- `@/*` maps to the repo root, not `src/`.

## Gotchas
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme colors
  (`ink`, `ivory`, `brass`, `sand`, `sage`) and fonts are declared in
  `app/globals.css` via `@theme inline` + `:root`. Add tokens there.
- shadcn components use `@base-ui/react` primitives, not Radix (see
  `components/ui/button.tsx`). Match that pattern for new components.
- Fonts come from `next/font/google` in `app/layout.tsx`: Manrope (`--font-body`,
  sans), Instrument Serif (`--font-serif`, `font-serif`), DM Mono (`--font-mono`, mono).
- Set `API_BASE_URL` (default `http://localhost:8000`). Server components and route
  handlers call the backend directly; the browser only calls same-origin
  `/api/catalog/*` proxies, so no CORS or `NEXT_PUBLIC_` variable is needed.
- Public API endpoints: `GET /api/v1/products/` (params `page`, `limit`, `search`,
  `category_ids`, `product_types`, `sort_by`, `sort_order`), `GET /api/v1/categories/`,
  `GET /api/v1/products/slug/{slug}`, and
  `GET /api/v1/products/{product_id}/variants/{variant_id}/recommendations`.
  There is no public product-by-id page.
- `/collection` uses hybrid rendering: the server prefetches/hydrates the first page;
  filters, pagination, home products, and recommendations run through React Query.
- A product can contain both `perfume` and `aatr` variants. The detail picker is
  type-first and size-second; recommendations follow the selected variant and the
  section is hidden when the API returns no recommendations.
- `product_types` uses the literal `aatr`; display it as "Attar".
  `sort_by` accepts only `created_at`, `min_price`, `max_price`.
- The list item already includes `min_price`, `max_price`, `compare_price`,
  `total_stock`, `short_detail`, `ingredients`, and `image_url`. There is no
  refetch-per-card and no featured/currency field; currency is always INR.
- Product images are remote ImageKit URLs. `next.config.mjs` sets
  `images.unoptimized: true` plus an `ik.imagekit.io` remote pattern; use
  `imageKitUrl()` from `lib/format.ts` for transformations.
- Vercel Analytics is only mounted when `NODE_ENV === 'production'`.
- Keep the `hono` override (`4.12.25`) in `package.json`.

## Conventions
- Use React Query hooks for browser catalogue data; keep server fetchers in
  `lib/api/products.ts` and add matching `/api/catalog/*` proxies for new browser calls.
- Use `cn()` from `@/lib/utils` for conditional/merged classes.
- Keep the editorial system: `font-serif` headings, `font-mono` labels, `ink`/`ivory`/
  `brass`/`sand`/`sage` tokens. Do not introduce a separate UI theme.
