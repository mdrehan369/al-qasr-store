import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Mono, Instrument_Serif, Manrope } from 'next/font/google'
import './globals.css'

const bodyFont = Manrope({ subsets: ['latin'], variable: '--font-body' })
const displayFont = Instrument_Serif({ subsets: ['latin'], variable: '--font-display', weight: '400' })
const monoFont = DM_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://alqasrfragrances.com'),
  title: { default: 'Al Qasr — Contemporary Attars & Parfums', template: '%s | Al Qasr' },
  description: 'Contemporary attars and extrait de parfums, composed in small batches in New Delhi. Discover a quieter kind of luxury with Al Qasr.',
  keywords: ['Al Qasr', 'attar', 'perfume', 'extrait de parfum', 'oud', 'New Delhi fragrance'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Al Qasr — Contemporary Attars & Parfums', description: 'Scent is a quiet kind of power.', url: 'https://alqasrfragrances.com', siteName: 'Al Qasr', locale: 'en_IN', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Al Qasr — Contemporary Attars & Parfums', description: 'Scent is a quiet kind of power.' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f5f0e8', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
