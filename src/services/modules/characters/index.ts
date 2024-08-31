'use client'

import marvelApi from '../../ApiClient'
import { ICharactersParams, IGetCharacterComicsResponse, IGetCharactersResponse } from './interface'

const list = async (params: ICharactersParams) => {
    const result = marvelApi.api.get<any, IGetCharactersResponse>('/characters', {
      params: {
        ...params,
        offset: params.offset !== 0 ? params.offset : undefined
      }
    })

  return result
}

const get = async (id: string) =>  marvelApi.api.get<any, IGetCharactersResponse>(`/characters/${id}`)

const getComics = async (id: string) => marvelApi.api.get<any, IGetCharacterComicsResponse>(`/characters/${id}/comics?limit=5`)

export {
    list,
    get,
    getComics
}
