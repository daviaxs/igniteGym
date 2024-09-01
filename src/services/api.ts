import { storageAuthTokenGet } from "@storage/storageAuthToken"
import { appError } from "@utils/appError"
import axios, { AxiosError, AxiosInstance } from "axios"

type SignOut = () => void

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

const api = axios.create({
  baseURL: "http://192.168.15.7:3333"
}) as APIInstanceProps

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await storageAuthTokenGet()

        if (!refresh_token) {
          signOut()
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.storageConfig

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                resolve(api(originalRequestConfig))
              },

              onFailure: (error: AxiosError) => {
                reject(error)
              }
            })
          })
        }

        isRefreshing = true
      }

      signOut()
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new appError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }