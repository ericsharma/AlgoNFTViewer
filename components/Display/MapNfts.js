/** @jsxImportSource theme-ui */
import { Divider, Box, Text } from "@theme-ui/components"
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
        <Divider />
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
    <Box>
      <Fade
        in={triggerTransition}
        message={"Hover/Click the NFT to find out more info"}
        error={error}
      />

      <MapNfts array={array} sx={{ mt: 2 }} />
    </Box>
  )
}
