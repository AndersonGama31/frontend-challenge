import Image from 'next/image'

import { IGetCharacterComicsResponse } from '@/services/modules/characters/interface'

// - Seção com 5 quadrinhos do herói, contendo imagem, nome, data de lançamento, quantidade de páginas e uma breve descrição (limitada em 200 caracteres).

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
    <div className="flex w-[1170px] h-[263px] rounded-radius-30 shadow-lg bg-white gap-10">
      <div className="flex relative h-[263px] w-[248px] rounded-l-70 bg-white overflow-hidden">
        <Image src={url()} alt="hero" layout="fill" className="object-cover rounded-l-2xl" />
      </div>

      <div className="flex flex-col items-center w-3/4 p-5 gap-3">
        <h3 className="w-full text-[30px] font-bold text-dark clamp-2 leading-md">{title}</h3>

        <div className="flex w-full gap-4">
          <p className="text-[18px] leading-base text-dark gap-4">{date}</p>
          <p className="text-[18px] leading-base text-dark gap-4"> {pageCount} pages</p>
        </div>

        <p className="w-full text-xl text-dark line-clamp-4 leading-[23px]">{description || 'Sem descrição'}</p>
      </div>
    </div>
  )
}
