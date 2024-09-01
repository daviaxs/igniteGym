import { storageAuthTokenGet } from "@storage/storageAuthToken"
import { appError } from "@utils/appError"
import axios, { AxiosInstance } from "axios"

type SignOut = () => void

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: "http://192.168.15.7:3333"
}) as APIInstanceProps

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await storageAuthTokenGet()

        if (!refresh_token) {
          signOut()
          return Promise.reject(requestError)
        }
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