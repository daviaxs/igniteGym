import { userDTO } from "@dtos/userDTO"
import { api } from "@services/api"
import { storageAuthTokenSave } from "@storage/storageAuthToken"
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

  async function storageUserAndToken(userData: userDTO, token: string) {
    try {
      setIsLoadingUserData(true)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      await storageUserSave(userData)
      await storageAuthTokenSave(token)

      setUser(userData)
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
        storageUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUser() {
    try {
      const user = await storageUserGet()

      if (user) {
        setUser(user)
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
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingUserData, signOut }}
    >
      {children}
    </AuthContext.Provider >
  )
}