import { userDTO } from "@dtos/userDTO"
import { api } from "@services/api"
import { storageUserGet, storageUserSave } from "@storage/storageUser"
import { createContext, ReactNode, useEffect, useState } from "react"

interface AuthContextProps {
  user: userDTO
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userDTO>({} as userDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      console.log(data)

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUser() {
    const user = await storageUserGet()

    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn }}
    >
      {children}
    </AuthContext.Provider >
  )
}