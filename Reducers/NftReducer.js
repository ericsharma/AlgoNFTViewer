import { ACTIONS } from "./ACTIONS";
export default function NftReducer(nftState, action) {
  switch (action.type) {
    case ACTIONS.setAddr:
      return { ...nftState, addr: action.payload.addr };

    case ACTIONS.setTxId:
      return { ...nftState, txId: action.payload.txId };

    case ACTIONS.setFormSubmitted:
      return { ...nftState, formSubmitted: action.payload.formSubmitted };

    case ACTIONS.setFileType:
      return { ...nftState, fileType: action.payload.fileType };

    case ACTIONS.setSrc:
      return { ...nftState, src: action.payload.src };

    case ACTIONS.setName:
      return { ...nftState, name: action.payload.name };

    case ACTIONS.setAssetId:
      return { ...nftState, assetId: action.payload.assetId };
    case ACTIONS.setBlock:
      return { ...nftState, block: action.payload.block };

    case ACTIONS.setPricePaid:
      return { ...nftState, pricePaid: action.payload.pricePaid };

    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}
