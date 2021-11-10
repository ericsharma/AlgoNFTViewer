/** @jsxImportSource theme-ui */
import { Divider, Box, Card, Text } from "@theme-ui/components"
import { useState, useEffect } from "react"

import {
  AddressImageNftDisplay,
  AddressVideoNftDisplay,
  Fade,
} from "../Display/styles"

function MapNfts({ array }) {
  return array.map((nft) => {
    return (
      <>
        {nft.fileType.includes("image") ? (
          <AddressImageNftDisplay nftState={nft} key={nft.name} />
        ) : (
          <AddressVideoNftDisplay nftState={nft} key={nft.name} />
        )}
      </>
    )
  })
}
export default function StyledAddressNfts({ array }) {
  const [triggerTransition, setTriggerTransition] = useState(false)
  const [error, setError] = useState(false)

  const executeAlertTransition = () => {
    setTriggerTransition(true)
    setTimeout(() => setTriggerTransition(false), 3000)
  }
  const setAlertError = () => {
    setError(true)
    setTimeout(() => setError(false), 4000)
  }

  useEffect(() => {
    executeAlertTransition()
  }, [])

  return (
    <>
      <Box
        sx={{
          overflowY: "auto",
          "@media (min-width: 360px)": {
            gridArea: "3 / 2 / 8 / 8",
          },
          "@media (min-width: 800px)": {
            gridArea: "3 / 4 / 8 / 6",
          },
        }}
      >
        {/* <Box sx={{}}>
          <Fade
            in={triggerTransition}
            message={
              "Hover/Click the NFT to find out more info and scroll to see more."
            }
            error={error}
          />
        </Box> */}
        <Box sx={{ mt: 2 }}>
          <Text
            sx={
              {
                // "@media (min-width: 360px)": {
                //   display: "none",
                // },
                // "@media (min-width: 800px)": {
                //   display: "revert",
                //   ml: 10,
                //   mt: 2,
                // },
              }
            }
          >
            Hover/Click the NFT to find out more info and scroll to see more.
          </Text>
        </Box>
        <MapNfts array={array} />
      </Box>
      {/* Will look terrible on mobile */}
    </>
  )
}
