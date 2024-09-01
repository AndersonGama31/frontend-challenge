import React from 'react'

import Image from 'next/image'

import useCharacterStore from '@/stores/useCharacterStore'

export const Parallax: React.FC = () => {
  const {
    state: { character }
  } = useCharacterStore()

  const url = () => {
    if (character) {
      return `${character?.thumbnail.path}.${character?.thumbnail.extension}`
    }

    return 'hero.svg'
  }

  console.log(character)

  return (
    <>
      <div className="w-full h-[578px] relative">
        <Image src={'/background.svg'} alt="hero" layout="fill" objectFit="cover" />
        <h1 className="absolute top-20 left-20 text-white text-5xl font-black p-5 w-[600px ] leading-xl">
          DESCUBRA TODOS OS
          <br />
          QUADRINHOS
          <br />
          DESTE PERSONAGEM
        </h1>
      </div>
      <div className="flex w-[1170px] h-[340px] rounded-radius-70 shadow-lg bg-white absolute top-[360px] left-1/2 transform -translate-x-1/2 px-24 py-16 gap-10">
        <div className="flex relative w-56 h-56 rounded-radius-70 bg-white">
          <Image src={url()} alt="hero" layout="fill" className="rounded-full p-2 object-cover" />
        </div>
        <div className="flex flex-col items-center justify-between w-3/4">
          <h3 className="w-full text-[42px] font-bold text-dark mt-5 truncate">{character?.name || 'Sem nome'}</h3>
          <p className="w-full text-[24px] text-dark line-clamp-4 leading-[28px] mt-4">
            {character?.description || 'Sem descrição'}
          </p>
        </div>
      </div>
    </>
  )
}
