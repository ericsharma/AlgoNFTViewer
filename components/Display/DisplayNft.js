/** @jsxImportSource theme-ui */

import { StyledNftImage, StyledNftVideo } from "../Display/styles"
import { Box } from "@theme-ui/components"

export default function DisplayNft({ nftState, storageSubmit }) {
  return nftState.fileType.includes("image") ? (
    <>
      <StyledNftImage nftState={nftState} storageSubmit={storageSubmit} />
    </>
  ) : (
    <Box>
      <StyledNftVideo
        nftState={nftState}
        storageSubmit={storageSubmit}
      ></StyledNftVideo>
    </Box>
  )
}
