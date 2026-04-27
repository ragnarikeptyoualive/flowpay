import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import Footer from '@/components/Footer';
import NotificationBar from '@/components/NotificationBar';
import { Providers } from './providers'

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

const title = 'Buy Aged Stripe Account | Bypass Shopify Verification | Unfreeze Stripe Funds | FlowPay';
const description = 'Buy aged Stripe account, bypass Shopify verification, unfreeze Stripe funds. US/UK Business Infrastructure for high-volume operators. Verified Stripe, Shopify accounts. 48h delivery.';

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
        alt: 'Buy aged Stripe account - Bypass Shopify verification - FlowPay verified infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  generator: 'v0.app',
  keywords: 'buy aged Stripe account, bypass Shopify verification, unfreeze Stripe funds, US Stripe account, UK business infrastructure, verified Shopify store',
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
          <NotificationBar />
          <div className="pt-16 sm:pt-12">
            {children}
          </div>
          <Footer />
{process.env.NODE_ENV === 'production' && <Analytics />}
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1438477980847674');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{display:'none'}}
              src={`https://www.facebook.com/tr?id=1438477980847674&ev=PageView&noscript=1`} 
              alt=""
            />
          </noscript>
        </Providers>
      </body>
    </html>
  )
}

