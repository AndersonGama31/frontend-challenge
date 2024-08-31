'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Loader } from 'lucide-react'

import * as Component from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import * as charactersService from '@/services/modules/characters'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function HomePage() {
  const [params, setParams] = useState<ICharactersParams>({ limit: 16, offset: 0 })
  const { ref, inView } = useInView()
  const debouncedValue = useDebounce(params.nameStartsWith, 1000)

  const { data, isLoading, isFetched, fetchNextPage, refetch, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['characters-list'],
    queryFn: ({ pageParam }) => charactersService.list({ ...params, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (lastPage?.length < 16) {
        return undefined
      }

      return allPages?.length * 16
    }
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const handleChangeParams = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { value, name } = event.target
    setParams(prevState => ({ ...prevState, [name]: value || undefined, offset: 0 }))
  }

  useEffect(() => {
    setParams(prevState => ({ ...prevState, offset: 0 }))
    refetch()
  }, [debouncedValue])

  const totalResults = data?.pages?.reduce((acc, page) => acc + page?.results?.length, 0)

  return (
    <main className="flex flex-col items-center h-screen space-y-8 max-w-screen-xl px-20 pt-20">
      <section className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-5xl font-black text-center text-dark">EXPLORE O UNIVERSO E CRIE SUA EQUIPE</h1>
        <p className="text-center text-dark opacity-60 mb-5">
          Os melhores personagens já feitos em quadrinhos. Fique viciado em uma generosa porção de heróis e vilões!
        </p>
        <div className="flex items-center justify-center w-[780px] mt-2">
          <Component.Input type="text" name="nameStartsWith" onChange={handleChangeParams} />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-semibold text-light-gray">
            {/* Encontrados {data?.pages?.[0]?.results?.length} heróis */}
            Encontrados {totalResults} heróis
          </p>

          <p className="text-2xl font-medium text-destructive/70 cursor-pointer" onClick={() => alert('Favoritos')}>
            Somente favoritos
          </p>
        </div>

        {isLoading && <Loader className="w-20 h-20 animate-spin mt-10" />}

        {isFetched && (
          <>
            <div className="grid grid-cols-4 gap-8 mt-8">
              {data?.pages?.map(page => page?.results?.map(hero => <Component.HeroCard key={hero.id} {...hero} />))}
            </div>
            <div ref={ref} className="h-5" />
          </>
        )}

        {isFetchingNextPage && <Loader className="w-10 h-10 animate-spin" />}
      </section>
    </main>
  )
}
