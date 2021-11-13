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
          "@media (min-width: 360px)": {
            gridArea: "3 / 2 / 9 / 16",
          },
          "@media (min-width: 800px)": {
            gridArea: "3/6/4/12",
          },
        }}
      >
        <Fade
          in={triggerTransition}
          message={
            "Hover/Click th NFT to find out more info and scroll to see more."
          }
          error={error}
        />
      </Box>
      <Box
        sx={{
          overflowY: "auto",

          "@media (min-width: 360px)": {
            gridArea: "4 / 2 / 9 / 16",
          },
          "@media (min-width: 800px)": {
            gridArea: "4 / 6 / 9 / 12",
          },
        }}
      >
        <MapNfts array={array} />
      </Box>
    </>
  )
}
