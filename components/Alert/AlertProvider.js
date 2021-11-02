import { createContext, useState } from "react"
export const AlertContext = createContext()

export default function AlertProvider({ children }) {
  const [alertMessage, setAlertMessage] = useState(null)
  const [triggerTransition, setTriggerTransition] = useState(false)
  const [error, setError] = useState(false)
  //

  const executeAlertTransition = () => {
    setTriggerTransition(true)
    setTimeout(() => setTriggerTransition(false), 3000)
  }

  const setAlertError = () => {
    setError(true)
    setTimeout(() => setError(false), 4000)
  }

  return (
    <AlertContext.Provider
      value={{
        alertMessage,
        triggerTransition,
        error,
        setAlertMessage,
        executeAlertTransition,
        setAlertError,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}
