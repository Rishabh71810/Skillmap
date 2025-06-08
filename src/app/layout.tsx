import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { APP_CONFIG } from '@/lib/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_CONFIG.NAME,
  description: APP_CONFIG.DESCRIPTION,
  keywords: ['mind map', 'learning', 'AI', 'education', 'resources', 'study'],
  authors: [{ name: 'SkillMap Team' }],
  creator: 'SkillMap',
  publisher: 'SkillMap',
  openGraph: {
    title: APP_CONFIG.NAME,
    description: APP_CONFIG.DESCRIPTION,
    url: 'https://skillmap.ai',
    siteName: APP_CONFIG.NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.NAME} - ${APP_CONFIG.DESCRIPTION}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.NAME,
    description: APP_CONFIG.DESCRIPTION,
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <div id="portal-root" />
        <Providers>
          <div className="min-h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
} 