'use client'

import marvelApi from '../../ApiClient'

const list = (): Promise<any> => marvelApi.api.get('/characters')

export {
    list
}
