import Image from 'next/image'

import { IGetCharacterComicsResponse } from '@/services/modules/characters/interface'

export const ComicsCard: React.FC<IGetCharacterComicsResponse['results'][0]> = ({
  textObjects,
  dates,
  images,
  title,
  pageCount,
  thumbnail
}) => {
  const url = () => {
    if (thumbnail) {
      return `${thumbnail.path}.${thumbnail.extension}`
    }

    if (images) {
      return `${images[0].path}.${images[0].extension}`
    }

    return 'hero.svg'
  }
  const date = new Date(dates[0].date).toLocaleDateString('pt-BR')
  const description = textObjects?.find(item => typeof item.text === 'string')?.text

  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-11/12 md:w-[90%] lg:w-[1170px] min-h-[200px] sm:h-auto rounded-2xl shadow-lg bg-white">
      <div className="relative h-48 sm:h-auto sm:w-1/3 md:w-1/4 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none bg-white overflow-hidden">
        <Image src={url()} alt="hero" layout="fill" className="object-cover" />
      </div>

      <div className="flex flex-col justify-between w-full sm:w-2/3 md:w-3/4 p-4 sm:p-5 gap-2 sm:gap-3">
        <h3 className="text-2xl sm:text-[26px] md:text-[30px] font-bold text-dark leading-tight sm:leading-snug md:leading-md line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base md:text-[18px] text-dark">
          <p>{date}</p>
          <p>{pageCount} pages</p>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-dark line-clamp-3 sm:line-clamp-4 leading-snug sm:leading-[23px]">
          {description || 'Sem descrição'}
        </p>
      </div>
    </div>
  )
}
