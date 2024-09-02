'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Heart, Loader } from 'lucide-react'

import * as Component from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import * as charactersService from '@/services/modules/characters'
import { ICharactersParams } from '@/services/modules/characters/interface'
import useCharacterStore from '@/stores/useCharacterStore'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function HomePage() {
  const [params, setParams] = useState<ICharactersParams>({ limit: 16, offset: 0 })
  const { ref, inView } = useInView()
  const debouncedValue = useDebounce(params.nameStartsWith, 1000)
  const [filterFavorites, setFilterFavorites] = useState(false)

  const {
    state: { favoriteCharacters }
  } = useCharacterStore()

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

  useEffect(() => {
    refetch()
  }, [debouncedValue])

  const totalResults = () => {
    if (filterFavorites) {
      return filteredFavorites?.length
    }
    return data?.pages?.reduce((acc, page) => acc + page.results.length, 0)
  }
  const handleChangeParams = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { value, name } = event.target
    setParams(prevState => ({ ...prevState, [name]: value || undefined, offset: 0 }))
  }

  const filteredFavorites = favoriteCharacters?.filter(hero => hero.name.toLowerCase().includes(debouncedValue ?? ''))

  return (
    <main className="flex flex-col items-center flex-grow space-y-8 max-w-screen-xl sm:px-6 lg:px-8 pt-20 relative">
      <section className="flex flex-col items-center justify-center gap-2 text-center w-full px-[50px]">
        <h1 className="w-full text-3xl lg:text-5xl font-black text-dark">EXPLORE O UNIVERSO E CRIE SUA EQUIPE</h1>
        <p className="w-full text-dark opacity-60 mb-5 px-4 sm:p-0">
          Os melhores personagens já feitos em quadrinhos. Fique viciado em uma generosa porção de heróis e vilões!
        </p>
        <div className="flex items-center justify-center w-full px-4 lg:max-w-[780px] sm:px-0 mt-2">
          <Component.Input type="text" name="nameStartsWith" onChange={handleChangeParams} />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          <p className="text-lg sm:text-2xl font-semibold text-light-gray">Encontrados {totalResults()} heróis</p>

          <div className="flex items-center justify-center gap-4 mt-4 sm:mt-0">
            <Heart
              className={cn('w-6 h-6 sm:w-8 sm:h-8 text-destructive cursor-pointer', {
                'fill-current': filterFavorites
              })}
            />
            <p
              className="text-lg sm:text-2xl font-medium text-[#f5706f] cursor-pointer"
              onClick={() => setFilterFavorites(!filterFavorites)}
            >
              Somente favoritos
            </p>
          </div>
        </div>

        {isLoading && <Loader className="w-20 h-20 animate-spin mt-10" />}

        {isFetched && (
          <>
            {filterFavorites ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 mt-8">
                {filteredFavorites?.map(hero => <Component.HeroCard key={hero.id} {...hero} />)}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 mt-8">
                  {data?.pages?.map(page => page?.results?.map(hero => <Component.HeroCard key={hero.id} {...hero} />))}
                </div>
                <div ref={ref} className="h-5" />
              </>
            )}
          </>
        )}

        {isFetchingNextPage && <Loader className="w-10 h-10 animate-spin" />}
      </section>
    </main>
  )
}
