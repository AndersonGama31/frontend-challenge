import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'
import Provider from '@/utils/providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900']
})

export const metadata: Metadata = {
  title: 'InstaCarro Frontend Challenge',
  description: 'Explore o universo e crie sua equipe de heróis'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* <body className={roboto.className}> */}
      <body className={cn(roboto.className, 'flex justify-center h-screen bg-background overflow-x-hidden')}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
