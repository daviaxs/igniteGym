import { userDTO } from "@dtos/userDTO"
import { api } from "@services/api"
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken"
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser"
import { createContext, ReactNode, useEffect, useState } from "react"

interface AuthContextProps {
  user: userDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserData: boolean
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userDTO>({} as userDTO)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  async function userAndTokenUpdate(userData: userDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: userDTO, token: string) {
    try {
      setIsLoadingUserData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        await userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (userLogged && token) {
        await userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true)
      setUser({} as userDTO)

      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingUserData, signOut }}
    >
      {children}
    </AuthContext.Provider >
  )
}