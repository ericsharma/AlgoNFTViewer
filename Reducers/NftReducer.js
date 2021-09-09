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

    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}
