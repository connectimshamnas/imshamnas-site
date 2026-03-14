import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://imshamnas.com'),
  title: {
    default: 'imshamnas — Digital Marketing & SEO Expert in Oman & GCC',
    template: '%s | imshamnas.com'
  },
  description: 'Elevate your business with expert Digital Marketing, SEO, Paid Ads, and Web Development services across Oman, UAE, and GCC. Data-driven strategies for 2026 growth.',
  keywords: ['Digital Marketing Oman', 'SEO Expert Muscat', 'Google Ads UAE', 'Web Development GCC', 'Business Growth Consultant', 'imshamnas'],
  authors: [{ name: 'Shamnas' }],
  creator: 'Shamnas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://imshamnas.com',
    siteName: 'imshamnas',
    title: 'imshamnas — Digital Growth Expert in Oman',
    description: 'Specializing in SEO, Paid Ads, and Web Design to scale businesses in the GCC region.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'imshamnas Digital Growth' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'imshamnas — Digital Growth Expert',
    description: 'Scaling businesses in Oman & GCC through expert digital strategy.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
