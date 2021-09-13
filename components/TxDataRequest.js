import { ACTIONS } from "../Reducers/ACTIONS";

async function typeChecker(url) {
  const response = await fetch(url);
  console.log("response says " + response);
  const blob = await response.blob();
  console.log("blob says " + blob);
  return blob;
}
async function getUrl(assetId) {
  const reqUrl = `https://algoexplorerapi.io/idx2/v2/assets/${assetId}`;
  const txRes = await fetch(reqUrl);
  const txData = await txRes.json();

  const assetUrl = await txData.asset.params;
  console.log("assetUrl says " + assetUrl);
  return assetUrl;
}

async function getAssetId(txId) {
  const txRes = await fetch(
    `https://algoexplorerapi.io/v1/transaction/${txId}`
  );
  const txData = await txRes.json();
  const assetId = await txData.curxfer.id;
  const params = await getUrl(assetId);
  console.log("asset Params says " + params);
  return params;
}

export function handleTxRequest(dispatch, nftState, setLoaded) {
  //this is bad because the order of the parameters matters and can lead to weird bugs

  const params = getAssetId(nftState.txId);
  params.then((params) => {
    // setSrc(params.url);
    dispatch({ type: ACTIONS.setSrc, payload: { src: params.url } });

    setLoaded(true);

    dispatch({ type: ACTIONS.setName, payload: { name: params.name } });
    // typeChecker(params.url).then((blob) => setType(blob.type));
    typeChecker(params.url).then((blob) => {
      dispatch({ type: ACTIONS.setFileType, payload: { fileType: blob.type } });
      console.log("nftState says" + nftState.fileType);
    });
  });
}
