import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'

import './globals.css'

const inter = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: 'SEVN NEWS',
  description: 'The latest news from around the world.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
