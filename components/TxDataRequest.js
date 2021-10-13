import { ACTIONS } from "../Reducers/ACTIONS"

// *****GENERAL THOUGHT PROCESS FOR DATA**********

// WHY CREATOR ADRESS NEEDS SPECIAL ATTENTION/HELPER FUNCTIONS
// If creator address isn't in closeTo of the transaction then check the "from" field of the tx and make a new fetch on that address (Escrow Fetch).
// If if the "".asset" element of the Escrow is a non zero array then find the address by looking at the creator of the first element in array
// If the array is empty then we find creator from looking at the other fetch call using "from" and look at transactions array
// Filter out the transactions to find the transaction that has algo leaving the escrow account (assuming that the algo leaving escrow goes to creator)
// dispatch the final creator depending on which of the three above variables are null.

const isEscrowActive = (arr) => {
  return arr.length !== 0 ? arr[0].creator : false
}

const getAddressFromEscrowTransactions = (arr) => {
  return arr.filter((item) => item["closing-amount"] !== 0)[0][
    "payment-transaction"
  ].receiver
}

const handleCreatorAddress = (
  creatorAddress,
  creatorAddressEscrow,
  creatorAddressEscrowCloseTo
) => {
  return creatorAddress
    ? creatorAddress
    : creatorAddressEscrow
    ? creatorAddressEscrow
    : creatorAddressEscrowCloseTo
}

const epochDateConverter = (timestamp) => {
  const date = new Date(0)
  date.setUTCSeconds(timestamp)
  return date
}
async function typeChecker(url) {
  const blob = await fetch(url).then((res) => res.blob())
  return blob
}
async function getAssetUrl(assetId) {
  const reqUrl = `https://algoexplorerapi.io/idx2/v2/assets/${assetId}`
  const assetUrl = await fetch(reqUrl)
    .then((res) => res.json())
    .then((json) => json.asset.params)
  return assetUrl
}

async function getAssetInformation(txId, dispatch) {
  const txData = await fetch(
    `https://algoexplorerapi.io/v1/transaction/${txId}`
  ).then((res) => res.json())

  // necessary parameters for finding price

  const round = await txData.round

  const timestamp = await txData.timestamp

  const rcv = await txData.curxfer.rcv
  //(theory) closeTo only happens after the auction closes and the money leaves escrow
  const from = await txData.from

  const creatorAddress = await txData.curxfer.closeto

  const escrow = await fetch(
    `https://algoexplorerapi.io/v2/accounts/${from}`
  ).then((res) => res.json())

  const escrowTransactions = await fetch(
    `https://algoexplorerapi.io/idx2/v2/accounts/${from}/transactions`
  ).then((res) => res.json())

  const escrowArr = await escrow.assets
  const escrowTransactionsArr = await escrowTransactions.transactions

  const creatorAddressEscrow = isEscrowActive(escrowArr)

  const creatorAddressEscrowCloseTo =
    !creatorAddressEscrow && !creatorAddress
      ? getAddressFromEscrowTransactions(escrowTransactionsArr)
      : null

  const price = await pricePaid(rcv, round)

  dispatch({
    type: ACTIONS.setTimestamp,
    payload: { timestamp: epochDateConverter(timestamp) },
  })

  dispatch({
    type: ACTIONS.setPricePaid,
    payload: {
      pricePaid: price,
    },
  })

  dispatch({
    type: ACTIONS.setBlock,
    payload: {
      block: {
        round: round,
        creatorAddress: handleCreatorAddress(
          creatorAddress,
          creatorAddressEscrow,
          creatorAddressEscrowCloseTo
        ),
        rcv: rcv,
      },
    },
  })

  const assetId = await txData.curxfer.id
  dispatch({ type: ACTIONS.setAssetId, payload: { assetId: assetId } })

  const params = await getAssetUrl(assetId)
  return params
}

async function pricePaid(rcv, block) {
  const reqUrl = `https://algoexplorerapi.io/idx2/v2/blocks/${block}`
  const transactions = await fetch(reqUrl)
    .then((res) => res.json())
    .then((blockData) => blockData.transactions)

  let num
  // ToDo: Lookinto whether differing asset prices in same block is possible
  for (let transaction of transactions) {
    if (transaction["tx-type"] === "pay" && transaction["sender"] === rcv) {
      num = Number(transaction["payment-transaction"]["amount"]) / 1000000.0
    }
  }
  return num
}
export function handleTxRequest(dispatch, nftState, setLoaded) {
  const assetInformation = getAssetInformation(nftState.txId, dispatch)

  assetInformation.then((asset) => {
    dispatch({ type: ACTIONS.setSrc, payload: { src: asset.url } })
    setLoaded(true)
    dispatch({ type: ACTIONS.setName, payload: { name: asset.name } })
    typeChecker(asset.url).then((blob) => {
      dispatch({ type: ACTIONS.setFileType, payload: { fileType: blob.type } })
    })
  })
}
