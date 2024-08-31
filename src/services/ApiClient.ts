'use client'

import axios, { Axios } from 'axios'
import md5 from 'md5'

class MarvelApiClient {
    api: Axios

    constructor() {
        const baseURL = 'https://gateway.marvel.com/v1/public'
        const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_KEY
        const privateKey = process.env.NEXT_PUBLIC_MARVEL_SECOND_API_KEY
        const ts = new Date().getTime().toString()
        const hash = md5(ts + privateKey + publicKey)

        this.api = axios.create({
            baseURL,
            responseType: 'json',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            params: {
                ts,
                apikey: publicKey,
                hash,
            }
        })

        this.api.interceptors.response.use(
            response => response.data,
            error => Promise.reject(error)
        )
    }
}


export default new MarvelApiClient()
