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

export default function DisplayNft({ nftState }) {
  return nftState.fileType.includes("image") ? (
    <>
      {/* <Text>
        {nftState.name} paid {nftState.pricePaid}
      </Text>

      <Image
        src={nftState.src}
        sx={{ maxHeight: 500, height: "50%", width: "auto" }}
        alt="image"
      /> */}
      <StyledNftImage nftState={nftState} />
    </>
  ) : (
    <>
      <StyledNftVideo nftState={nftState}>
        {/* <video loop autoPlay name="media" crossOrigin="anonymous" width="100%">
          <source
            src={nftState.src}
            type="video/mp4"
            sx={{ marginLeft: "auto" }}
          />
        </video> */}
      </StyledNftVideo>
      {/* <Text>
        {nftState.name} paid {nftState.pricePaid}
      </Text>
      <video controls autoPlay name="media" crossOrigin="anonymous">
        <source src={nftState.src} type="video/mp4" />
      </video>*/}
    </>
  )
}
