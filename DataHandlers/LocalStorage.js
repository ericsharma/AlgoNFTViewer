const entryExists = (currentState, newState) => {
  return currentState.filter((entry) => entry.txId === newState.txId).length !==
    0
    ? true
    : false
}

export const localStorageHandler = (
  walletAddr,
  payload,
  { setAlertError, setAlertMessage, executeAlertTransition }
) => {
  sessionStorage.setItem("user", walletAddr) //Persist wallet adress between page refreshes
  if (localStorage.getItem(walletAddr) === null) {
    localStorage.setItem(walletAddr, Object.assign(JSON.stringify([payload]))) //inititialize walletAddr to be an array with payload object at first index
    setAlertMessage("Entry has succesfully been saved to localStorage!")
    executeAlertTransition()
    return
  }
  const currentState = JSON.parse(localStorage.getItem(walletAddr))

  if (entryExists(currentState, payload)) {
    console.log("Entry is already in localStorage")
    setAlertMessage("Entry is already in localStorage")
    setAlertError()
    executeAlertTransition()
    // Location for setting error message
    return
  }

  const newStateStr = JSON.stringify(
    Object.assign(currentState, currentState.push(payload))
  )

  localStorage.setItem(walletAddr, newStateStr)
  setAlertMessage("Entry has succesfully been saved to localStorage!")
  executeAlertTransition()
}
