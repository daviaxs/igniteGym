import { userDTO } from "@dtos/userDTO"
import { createContext, ReactNode } from "react"

interface AuthContextProps {
  user: userDTO
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          avatar: 'john.png'
        }
      }}
    >
      {children}
    </AuthContext.Provider >
  )
}