/** @jsxImportSource theme-ui */
import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import { Card, Flex, Text, Image, IconButton, Grid } from "@theme-ui/components"
import Donations from "../../components/Header/Donations"

import Header from "../../components/Header/Header"
import {
  StyledMiniImageCard,
  StyledMiniVideoCard,
} from "../../components/Display/styles"

const Collection = () => {
  const router = useRouter()
  const [collection, setCollection] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const { addr } = router.query

  const MapCollection = ({ collection }) => {
    return collection.map((nft) => {
      return (
        <>
          {nft.fileType.includes("image") ? (
            <StyledMiniImageCard nftState={nft} key={nft.name} />
          ) : (
            <StyledMiniVideoCard nftState={nft} key={nft.name} />
          )}
        </>
      )
    })
  }

  const retrieveLocalStorage = (addr) => {
    if (addr) {
      //This is to stop setting of collection when params haven't coneback from Router object
      setCollection(JSON.parse(localStorage.getItem(addr)))
      setLoaded(true)
    }
  }

  useEffect(() => {
    retrieveLocalStorage(addr)
    console.log(sessionStorage.getItem("user") + " from the collections page")
  }, [addr])

  return (
    <>
      <Header />
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <h4 sx={{ display: "inline-block" }}>Wallet: {addr}</h4> */}
      </Flex>
      {loaded && (
        <Grid
          sx={{
            "@media (min-width: 360px)": {
              gridTemplateColumns: "1fr",

              gridTemplateRows: `repeat(${collection.length}, 35vh)`, //not sure if this is good practice
            },
            "@media (min-width: 800px)": {
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "25vh 25vh 25vh", //maybe change like above
            },

            gap: "1em",
          }}
        >
          <MapCollection collection={collection} />
        </Grid>
      )}
      <Donations />
    </>
  )
}

export default Collection
