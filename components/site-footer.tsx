import { Camera, Mail, Phone } from "lucide-react";

const contactLinks = [
  { label: "Call us", href: "tel:+919876543210", icon: Phone },
  { label: "Email", href: "mailto:hello@alqasrfragrances.com", icon: Mail },
  {
    label: "Instagram",
    href: "https://instagram.com/alqasrfragrances",
    icon: Camera,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/10 bg-ink px-6 py-10 text-ivory lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-3xl tracking-tight">
            Al Qasr<span className="text-brass">.</span>
          </p>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/40">
            Crafted slowly. Worn freely.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label === "Instagram" ? "_blank" : undefined}
              rel={label === "Instagram" ? "noreferrer" : undefined}
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/55 transition-colors hover:text-brass"
            >
              <Icon className="size-3.5 text-brass" />
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-ivory/10 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/35 sm:flex-row sm:justify-between">
        <span>Al Qasr · Kolkata, West Bengal, India</span>
        <span>Perfume & attar · Worldwide enquiries</span>
      </div>
    </footer>
  );
}
