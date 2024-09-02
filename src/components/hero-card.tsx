'use client'

import React from 'react'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { IGetCharactersResponse } from '@/services/modules/characters/interface'
import useCharacterStore from '@/stores/useCharacterStore'

type IProps = IGetCharactersResponse['results'][0]

export const HeroCard: React.FC<IProps> = ({ id, name, description, thumbnail, ...props }) => {
  const router = useRouter()

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const {
    actions: { setCharacter, addCharacterToFavorites, removeCharacterFromFavorites },
    state: { favoriteCharacters }
  } = useCharacterStore()

  const handleRedirect = () => {
    router.push(`/character/${id}`)
  }

  const handleSetCharacter = () => {
    setCharacter({ id, name, description, thumbnail, ...props })
  }

  const handleSetCharacterAndRedirect = () => {
    handleSetCharacter()
    delay(100).then(() => handleRedirect())
  }

  const isFavorite = favoriteCharacters.some(character => character.id === id)

  const handleFavoriteCharacter = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFavorite) {
      removeCharacterFromFavorites(id)
      return
    }

    addCharacterToFavorites({ id, name, description, thumbnail, ...props })
  }

  return (
    <div
      data-cy="hero-card"
      className="
      flex flex-col items-center w-[273px] h-[338px] rounded-radius-10
      border-[1px] border-solid border-light-gray bg-white shadow-md p-4
      cursor-pointer hover:border-color-neutral-light hover:shadow-lg"
      onClick={handleSetCharacterAndRedirect}
    >
      <div className="relative w-[238px] h-[169px]">
        <Image
          src={`${thumbnail?.path}.${thumbnail?.extension}` || 'hero.svg'}
          layout="fill"
          objectFit="cover"
          alt="hero"
          className="rounded-radius-8"
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full">
        <div className="w-full flex justify-between items-center mt-2">
          <h3 data-cy="hero-card-name" className="w-3/4 text-2xl font-bold text-dark truncate">
            {name}
          </h3>
          <Heart
            data-cy="favorite-button"
            className={cn('w-8 h-8 text-destructive cursor-pointer', {
              'fill-current': isFavorite
            })}
            onClick={handleFavoriteCharacter}
          />
        </div>
        <p className="w-full text-[16px] text-dark line-clamp-3 leading-sm mt-4">{description || 'Sem descrição'}</p>
      </div>
    </div>
  )
}
