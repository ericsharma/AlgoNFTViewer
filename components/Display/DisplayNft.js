/** @jsxImportSource theme-ui */
import {
  Box,
  Image,
  Text,
  Flex,
  Link,
  Heading,
  Grid,
} from "@theme-ui/components"
import { ST } from "next/dist/shared/lib/utils"
import { useEffect } from "react"
import { UserContext } from "../../Context/UserProvider"
import { StyledButton } from "../buttons/StyledButtons"
import { StyledHeaderLink } from "../buttons/StyledLinks"
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
