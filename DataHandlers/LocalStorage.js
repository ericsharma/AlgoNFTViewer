const entryExists = (currentState, newState) => {
  return currentState.filter((entry) => entry.txId === newState.txId)
    ? true
    : false;
};

export const localStorageHandler = (walletAddr, payload) => {
  sessionStorage.setItem("user", walletAddr); //Persist wallet adress between page refreshes
  if (localStorage.getItem(walletAddr) === null) {
    localStorage.setItem(walletAddr, Object.assign(JSON.stringify([payload]))); //inititialize walletAddr to be an array with payload object at first index
    return;
  }
  const currentState = JSON.parse(localStorage.getItem(walletAddr));

  if (entryExists(currentState, payload)) {
    console.log("Entry is already in localStorage");
    // Location for setting error message
    return;
  }

  const newStateStr = JSON.stringify(
    Object.assign(currentState, currentState.push(payload))
  );

  localStorage.setItem(walletAddr, newStateStr);
};
