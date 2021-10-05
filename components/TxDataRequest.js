import { ACTIONS } from "../Reducers/ACTIONS"
const epochDateConverter = (timestamp) => {
  const date = new Date(0)
  date.setUTCSeconds(timestamp)
  return date
}

async function typeChecker(url) {
  const blob = await fetch(url).then((res) => res.blob())
  return blob
}
async function getUrl(assetId) {
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
  dispatch({
    type: ACTIONS.setTimestamp,
    payload: { timestamp: epochDateConverter(timestamp) },
  })

  const rcv = await txData.curxfer.rcv
  //(theory) closeTo only happens after the auction closes and the money leaves escrow
  const from = await txData.from

  const creatorAddress = await txData.curxfer.closeto
  const escrow = await fetch(
    `https://algoexplorerapi.io/v2/accounts/${from}`
  ).then((res) => res.json())

  const creatorAddressEscrow = creatorAddress
    ? null
    : await escrow.assets[0].creator // awaiting closeto is falsey with no error so set the escrow query only if necessary
  const price = await pricePaid(rcv, round)

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
        creatorAddress: creatorAddress ? creatorAddress : creatorAddressEscrow,
        rcv: rcv,
      },
    },
  })

  const assetId = await txData.curxfer.id
  dispatch({ type: ACTIONS.setAssetId, payload: { assetId: assetId } })

  const params = await getUrl(assetId)
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
  //this is bad because the order of the parameters matters and can lead to weird bugs

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
