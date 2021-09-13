export const localStorageHandler = (walletAddr, payload) => {
  if (localStorage.getItem(walletAddr) === null) {
    localStorage.setItem(walletAddr, Object.assign(JSON.stringify([payload])));
    return;
  }
  const currentState = JSON.parse(localStorage.getItem(walletAddr));

  const newState = Object.assign(currentState, currentState.push(payload));
  console.log(newState);

  const newStateStr = JSON.stringify(newState);

  localStorage.setItem(walletAddr, newStateStr);

  //   Object.assign();
};

const sampleDataSet = {
  walletAddr: "wallet adress",
  nfts: [
    { txId: "txId", name: "name", src: "src" },
    { txId: "txId", name: "name", src: "src" },
  ],
};
