import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '@/components/Footer';
import { Providers } from './providers'

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

const title = 'FlowPay | Verified Merchant Infrastructure & Escrow for E-Commerce';
const description = 'FlowPay delivers verified Shopify and Stripe infrastructure, escrow security, and international banking with fast deployment for high-volume operators.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://flowpay.com'),
  openGraph: {
    title,
    description,
    url: 'https://flowpay.com',
    siteName: 'FlowPay',
    type: 'website',
    images: [
      {
        url: 'https://flowpay.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FlowPay verified merchant infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  generator: 'v0.app',
  icons: {
    icon: '/icon-light-32x32.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning dir="ltr">
      <body className="font-sans antialiased bg-white text-gray-900">
        <Providers>
          {children}
          <Footer />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}

