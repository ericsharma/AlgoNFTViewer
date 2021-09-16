import { ACTIONS } from "../Reducers/ACTIONS";

async function typeChecker(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}
async function getUrl(assetId) {
  const reqUrl = `https://algoexplorerapi.io/idx2/v2/assets/${assetId}`;
  const txRes = await fetch(reqUrl);
  const txData = await txRes.json();

  const assetUrl = await txData.asset.params;

  return assetUrl;
}

async function getAssetId(txId, dispatch) {
  const txRes = await fetch(
    `https://algoexplorerapi.io/v1/transaction/${txId}`
  );

  const txData = await txRes.json();
  const round = await txData.round;
  const rcv = await txData.curxfer.rcv;
  const closeto = await txData.curxfer.closeto;

  const price = await pricePaid(rcv, closeto, round, dispatch);
  console.log(price);

  dispatch({
    type: ACTIONS.setBlock,
    payload: { block: { round: round, closeto: closeto, rcv: rcv } },
  });
  const assetId = await txData.curxfer.id;
  dispatch({ type: ACTIONS.setAssetId, payload: { assetId: assetId } });
  const params = await getUrl(assetId);
  return params;
}

async function pricePaid(rcv, closeto, block, dispatch) {
  const reqUrl = `https://algoexplorerapi.io/idx2/v2/blocks/${block}`;
  const response = await fetch(reqUrl);
  const blockData = await response.json();
  const transactions = await blockData.transactions;

  // ToDo: Lookinto whether differing asset prices in same block is possible
  for (let transaction of transactions) {
    if (transaction["tx-type"] === "pay" && transaction["sender"] === rcv) {
      dispatch({
        type: ACTIONS.setPricePaid,
        payload: {
          pricePaid:
            Number(transaction["payment-transaction"]["amount"]) / 1000000.0,
        },
      });
    }
  }
}
export function handleTxRequest(dispatch, nftState, setLoaded) {
  //this is bad because the order of the parameters matters and can lead to weird bugs

  const assetInformation = getAssetId(nftState.txId, dispatch);

  assetInformation.then((params) => {
    dispatch({ type: ACTIONS.setSrc, payload: { src: params.url } });
    setLoaded(true);
    dispatch({ type: ACTIONS.setName, payload: { name: params.name } });
    typeChecker(params.url).then((blob) => {
      dispatch({ type: ACTIONS.setFileType, payload: { fileType: blob.type } });
      console.log("nftState says assetId " + nftState.assetId);
    });

    console.log("nft price Paid says " + nftState.pricePaid);
  });
}
