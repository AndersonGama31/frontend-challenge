'use client'

import { Loader } from 'lucide-react'

import * as Components from '@/components'
import { useGetCharacterComics } from '@/services/modules/characters/queries'

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { data, isLoading, isFetched } = useGetCharacterComics(slug)

  return (
    <main className="flex flex-col items-center h-screen max-w-screen-xl px-0 xl:px-20">
      <section className="flex w-screen relative">
        <Components.Parallax />
      </section>

      {isLoading && <Loader className="w-20 h-20 animate-spin mt-10" />}

      {isFetched && (
        <>
          <section className="flex flex-col items-center w-full gap-12 px-8 pb-20 pt-[380px] sm:pt-[400px] sm:px-0 md:pt-[280px] lg:pt-[200px]">
            {data?.results?.map(comic => <Components.ComicsCard key={comic.id} {...comic} />)}
          </section>
        </>
      )}
    </main>
  )
}
