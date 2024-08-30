import React from 'react'

import Image from 'next/image'

interface IProps {
  name: string
}

export const HeroCard: React.FC<IProps> = () => {
  return (
    <div
      className="flex flex-col items-center w-[273px] h-[338px] rounded-radius-10 border-[1px]
        border-solid border-light-gray bg-white shadow-lg p-4"
    >
      <Image src="hero.svg" width={238} height={169} alt="hero" className="rounded-radius-8" />
      <div className="flex flex-col items-center justify-between w-full">
        <h3 className="text-2xl font-bold text-dark mt-8">Homem-Aranha</h3>
        <p className="text-[16px] text-dark line-clamp-3 leading-sm mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
          dapibus diam. Sed nisi.
        </p>
      </div>
    </div>
  )
}
