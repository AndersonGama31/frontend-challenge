'use client'

import marvelApi from '../../ApiClient'

const list = async (params: ICharactersParams) => {
    const result = marvelApi.api.get<any, IGetCharactersResponse>('/characters', {
      params: {
        ...params,
        offset: params.offset !== 0 ? params.offset : undefined
      }
    })

    return result
  }

export {
    list
}
