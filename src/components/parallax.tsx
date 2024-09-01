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

  return (
    <div className="w-full relative">
      <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[578px] relative">
        <Image src={'/background.svg'} alt="hero" layout="fill" objectFit="cover" priority />
        <h1 className="absolute top-10 left-5 sm:top-16 sm:left-10 md:top-20 md:left-20 text-white text-3xl sm:text-4xl md:text-5xl font-black p-2 sm:p-3 md:p-5 w-full sm:w-full md:w-full leading-tight sm:leading-snug md:leading-xl">
          DESCUBRA TODOS OS
          <br />
          QUADRINHOS
          <br />
          DESTE PERSONAGEM
        </h1>
      </div>
      <div className="flex flex-col md:flex-row w-11/12 md:w-[90%] lg:w-[1170px] rounded-3xl shadow-lg bg-white absolute top-[250px] sm:top-[300px] md:top-[360px] left-1/2 transform -translate-x-1/2 p-6 sm:p-8 md:p-16 gap-6 md:gap-10">
        <div className="flex relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-white mx-auto md:mx-0">
          <Image src={url()} alt="hero" layout="fill" className="rounded-full p-2 object-cover" />
        </div>
        <div className="flex flex-col items-center md:items-start justify-between w-full md:w-3/4">
          <h3 className="w-full text-2xl sm:text-3xl md:text-[42px] font-bold text-dark mt-3 md:mt-5 truncate text-center md:text-left">
            {character?.name || 'Sem nome'}
          </h3>
          <p className="w-full text-lg sm:text-xl md:text-[24px] text-dark line-clamp-4 leading-tight sm:leading-snug md:leading-[28px] mt-2 md:mt-4 text-center md:text-left">
            {character?.description || 'Sem descrição'}
          </p>
        </div>
      </div>
    </div>
  )
}
