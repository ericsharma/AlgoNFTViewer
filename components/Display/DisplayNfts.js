/** @jsxImportSource theme-ui */

import { StyledNftImage, StyledNftVideo } from "../Display/styles"

export default function DisplayNft({ nftState, storageSubmit }) {
  return nftState.fileType.includes("image") ? (
    <>
      <StyledNftImage nftState={nftState} storageSubmit={storageSubmit} />
    </>
  ) : (
    <>
      <StyledNftVideo
        nftState={nftState}
        storageSubmit={storageSubmit}
      ></StyledNftVideo>
    </>
  )
}
