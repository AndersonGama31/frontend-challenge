import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import * as Components from '@/components'

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
      <body
        className={cn(roboto.className, 'flex flex-col items-center h-full bg-background overflow-x-hidden relative')}
      >
        <div className="flex flex-col min-h-screen pb-[82px]">
          <Provider>{children}</Provider>
          <Components.Footer />
        </div>
      </body>
    </html>
  )
}
