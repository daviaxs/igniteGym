import { AuthContext } from "@contexts/AuthContext"
import { useContext } from "react"

export function useAuth() {
  const userContextData = useContext(AuthContext)

  return userContextData
}