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
  const interceptTokenManager = api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new appError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }