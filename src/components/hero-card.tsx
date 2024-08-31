'use client'

import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { IGetCharactersResponse } from '@/services/modules/characters/interface'
import useCharacterStore from '@/stores/useCharacterStore'

type IProps = IGetCharactersResponse['results'][0]

export const HeroCard: React.FC<IProps> = ({ id, name, description, thumbnail }) => {
  const router = useRouter()

  const {
    actions: { setCharacter }
  } = useCharacterStore()

  const handleRedirect = () => {
    router.push(`/character/${id}`)
  }

  const handleSetCharacter = () => {
    setCharacter({ id, name, description, thumbnail })
  }

  const handleSetCharacterAndRedirect = () => {
    handleSetCharacter()
    handleRedirect()
  }

  return (
    <div
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
        <h3 className="w-full text-2xl font-bold text-dark mt-5 truncate">{name}</h3>
        <p className="w-full text-[16px] text-dark line-clamp-3 leading-sm mt-4">{description || 'Sem descrição'}</p>
      </div>
    </div>
  )
}
