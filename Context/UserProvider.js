import { createContext, useState } from "react"
export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  //
  const login = (addr) => {
    sessionStorage.setItem("user", addr)
    setUserToSession()
  }

  // Logout updates the user data to default
  const logout = () => {
    sessionStorage.clear()
    setUser(null)
  }

  const setUserToSession = () => {
    sessionStorage.getItem("user")
      ? setUser(sessionStorage.getItem("user"))
      : setUser(null)
  }

  return (
    <UserContext.Provider value={{ login, logout, setUserToSession, user }}>
      {children}
    </UserContext.Provider>
  )
}
