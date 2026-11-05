import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Camera, Check, Mail, MapPin, Phone } from "lucide-react";
import { EMAIL_ID, INSTAGRAM_URL, WHATSAPP_NO } from "@/lib/constants";

const phoneHref = WHATSAPP_NO;
const phoneLabel = "+91 91236 80629";
const emailHref = EMAIL_ID;
const instagramHref = INSTAGRAM_URL;

const occasions = [
  {
    title: "Weddings & receptions",
    detail:
      "A scent station for guests between ceremonies, dinners, and dancing.",
  },
  {
    title: "Private gatherings",
    detail:
      "Birthdays, anniversaries, and intimate evenings with a personal fragrance bar.",
  },
  {
    title: "Corporate & brand events",
    detail:
      "A considered activation for launches, client evenings, and team celebrations.",
  },
  {
    title: "Markets & exhibitions",
    detail: "A compact stall for curated fairs, cultural events, and pop-ups.",
  },
];

const offerings = [
  {
    title: "A curated scent bar",
    detail:
      "Perfumes and attars chosen for the mood, season, and guest list of your event.",
  },
  {
    title: "Guided discovery",
    detail:
      "Our host helps guests find a note, a layer, or a signature to take home.",
  },
  {
    title: "Gift-ready selections",
    detail:
      "Event gifting and take-home orders can be discussed when you enquire.",
  },
];

const steps = [
  {
    title: "Call or write",
    detail:
      "Share the date, venue, guest count, and the space you have in mind.",
  },
  {
    title: "Shape the stall",
    detail:
      "We confirm the collection, setup, timings, and any gifting requirements.",
  },
  {
    title: "We arrive",
    detail:
      "Al Qasr sets up the scent bar within the agreed window for your event.",
  },
  {
    title: "Your guests discover",
    detail:
      "Consultations, orders, and gift-ready selections are handled at the stall.",
  },
];

const eventChecklist = [
  "Your event date and venue",
  "An approximate guest count",
  "The table or floor space available",
  "Whether you would like event gifting",
];

const gallery = [
  {
    src: "/images/events/celebration-table.jpg",
    alt: "Elegant celebration table with candles, flowers, and glassware",
    caption: "Reception tables",
  },
  {
    src: "/images/events/wedding-hall.jpg",
    alt: "Candlelit wedding reception tables in an elegant hall",
    caption: "Wedding evenings",
  },
  {
    src: "/images/events/scent-bar.jpg",
    alt: "Perfume bottles arranged for a fragrance display",
    caption: "The scent bar",
  },
  {
    src: "/images/events/attar-detail.jpg",
    alt: "Ornate glass perfume bottle on a display table",
    caption: "A closer look",
  },
];

export const metadata: Metadata = {
  title: "Events & Stall Bookings",
  description:
    "Invite Al Qasr to your wedding, private gathering, corporate evening, or cultural event for a curated perfume and attar stall in Kolkata.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Stall Bookings | Al Qasr",
    description:
      "A considered perfume and attar stall for weddings, private gatherings, brand evenings, and cultural events.",
    url: "/events",
    siteName: "Al Qasr",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/events/event-table.jpg",
        width: 1800,
        height: 2696,
        alt: "Candlelit event table styled for an evening celebration",
      },
    ],
  },
};

export default function EventsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="mx-auto grid max-w-7xl items-stretch border-x border-border lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex flex-col justify-between bg-ivory px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div>
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
              Al Qasr, in person
            </p>
            <h1 className="max-w-2xl font-serif text-6xl leading-[0.92] tracking-[-0.05em] text-ink sm:text-7xl lg:text-8xl">
              Bring the house
              <br />
              to your
              <br />
              <em className="text-brass">celebration.</em>
            </h1>
            <p className="mt-10 max-w-md text-base leading-7 text-ink/70">
              A considered perfume and attar stall for weddings, private
              gatherings, brand evenings, and cultural events across Kolkata.
            </p>
          </div>

          <div className="mt-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-brass hover:text-ink"
              >
                <Phone className="size-4" />
                Call to plan a stall
              </a>
              <a
                href={emailHref}
                className="inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass sm:ml-2"
              >
                Email the house <ArrowUpRight className="size-4" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-brass" /> Kolkata, West Bengal
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brass" /> Stall
                bookings by enquiry
              </span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[560px] bg-ink lg:min-h-[720px]">
          <Image
            src="/images/events/event-table.jpg"
            alt="Candlelit event table styled for an evening celebration"
            fill
            priority
            className="object-cover object-center opacity-90"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute left-6 top-6 border border-ivory/30 bg-ink/50 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/85 backdrop-blur-sm">
            Stall enquiries open
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/80">
            <span className="size-2 rounded-full bg-brass" /> A scent bar for
            the evening
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-sage/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/60 lg:px-10">
          {[
            "Weddings",
            "Receptions",
            "Private dinners",
            "Corporate evenings",
            "Markets",
            "Cultural events",
          ].map((item, index, items) => (
            <span key={item} className="inline-flex items-center gap-5">
              {item}
              {index < items.length - 1 ? (
                <span className="text-brass">·</span>
              ) : null}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-32">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image
            src="/images/events/scent-bar.jpg"
            alt="Perfume bottles arranged for a fragrance display"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
        <div className="max-w-xl lg:pl-5">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
            The event scent bar
          </p>
          <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl">
            A fragrance counter
            <br />
            <em className="text-brass">that belongs in the room.</em>
          </h2>
          <p className="mt-8 text-base leading-8 text-muted-foreground">
            We bring the Al Qasr wardrobe to your venue — a quiet, considered
            setup that invites guests to pause, sample, and find something that
            feels personal.
          </p>

          <div className="mt-10 border-t border-border">
            {offerings.map((offering, index) => (
              <div
                key={offering.title}
                className="grid grid-cols-[auto_1fr] gap-5 border-b border-border py-6"
              >
                <span className="font-mono text-[9px] tracking-[0.16em] text-brass">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-ink">
                    {offering.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {offering.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
                Where we set up
              </p>
              <h2 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl">
                For gatherings that
                <br />
                <em className="text-brass">linger in the memory.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              From a full wedding weekend to a single evening, the stall is
              shaped around your room and your guests.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((occasion, index) => (
              <article
                key={occasion.title}
                className="bg-background p-6 lg:p-8"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
                  0{index + 1}
                </span>
                <h3 className="mt-6 font-serif text-3xl leading-tight text-ink">
                  {occasion.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {occasion.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
              The setting
            </p>
            <h2 className="font-serif text-5xl tracking-[-0.04em] text-ink sm:text-6xl">
              A room, warmed by <em className="text-brass">scent.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            A stall that feels like part of the evening — never a separate
            counter, never a distraction.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {gallery.map((image) => (
            <figure
              key={image.src}
              className="group relative aspect-[4/5] overflow-hidden bg-sand"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <figcaption className="absolute bottom-4 left-4 border border-ivory/25 bg-ink/55 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/85 backdrop-blur-sm">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-sage/20">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
              How it works
            </p>
            <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl">
              From first call
              <br />
              <em className="text-brass">to the final guest.</em>
            </h2>
          </div>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="bg-background p-6 lg:p-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
                  0{index + 1}
                </span>
                <h3 className="mt-6 font-serif text-3xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            Availability is confirmed on enquiry.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-32">
        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
            Before you call
          </p>
          <h2 className="max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl">
            A short call is
            <br />
            <em className="text-brass">enough to begin.</em>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-8 text-muted-foreground">
            Tell us a little about the evening. We will talk through the
            collection, the space, and what would feel right for your guests.
          </p>

          <ul className="mt-10 border-t border-border">
            {eventChecklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 border-b border-border py-4 text-sm text-ink/75"
              >
                <span className="flex size-6 items-center justify-center rounded-full border border-brass/40 text-brass">
                  <Check className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={phoneHref}
            className="mt-10 inline-flex items-center gap-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
          >
            Speak to us about your event <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src="/images/events/attar-detail.jpg"
            alt="Ornate glass perfume bottle on a display table"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-ivory lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
                Stall bookings
              </p>
              <h2 className="max-w-3xl font-serif text-6xl leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                Let us bring
                <br />
                Al Qasr to your
                <br />
                <em className="text-brass">next gathering.</em>
              </h2>
              <p className="mt-8 max-w-md text-base leading-7 text-ivory/65">
                Based in Kolkata. Travel outside the city can be discussed when
                you enquire.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={phoneHref}
                className="flex items-center justify-between gap-5 border-b border-ivory/20 pb-5 text-ivory transition-colors hover:text-brass"
              >
                <span className="flex items-center gap-3">
                  <Phone className="size-4 text-brass" />
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/45">
                      Call
                    </span>
                    <span className="mt-1 block font-serif text-2xl">
                      {phoneLabel}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href={emailHref}
                className="flex items-center justify-between gap-5 border-b border-ivory/20 pb-5 text-ivory transition-colors hover:text-brass"
              >
                <span className="flex items-center gap-3">
                  <Mail className="size-4 text-brass" />
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/45">
                      Email
                    </span>
                    <span className="mt-1 block font-serif text-2xl">
                      hello@alqasrfragrances.com
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-5 border-b border-ivory/20 pb-5 text-ivory transition-colors hover:text-brass"
              >
                <span className="flex items-center gap-3">
                  <Camera className="size-4 text-brass" />
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/45">
                      Instagram
                    </span>
                    <span className="mt-1 block font-serif text-2xl">
                      @al_qasr_fragrance
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-ivory/20 pt-6 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/40 sm:flex-row">
            <span>Al Qasr · Kolkata, West Bengal, India</span>
            <span>Weddings · Private events · Corporate evenings</span>
          </div>
        </div>
      </section>
    </main>
  );
}
