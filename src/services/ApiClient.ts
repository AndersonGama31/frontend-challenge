'use client'

import axios, { Axios } from 'axios'

class ApiClient {
    api: Axios

    constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            responseType: 'json',
            timeout: 60000
        })

        this.api.interceptors.response.use(
            response => {
                return response.data
            },
            error => {
                return Promise.reject(error)
            }
        )
    }
}

export default new ApiClient()
