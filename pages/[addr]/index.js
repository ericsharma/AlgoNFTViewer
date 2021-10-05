/** @jsxImportSource theme-ui */
import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import { Box, Flex, Text, Image, Video } from "@theme-ui/components"
import { UserContext } from "../../Context/UserProvider"
import Header from "../../components/Header/Header"

const Collection = () => {
  const router = useRouter()
  const [collection, setCollection] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const { addr } = router.query

  const MapCollection = ({ collection }) => {
    return collection.map((nft) => {
      return (
        <>
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
              mb: 10,
            }}
            key={nft.name}
          >
            <Text sx={{ display: "inline-block" }}>
              Title: {nft.name} ----- Price Paid: {nft.pricePaid}
            </Text>
          </Flex>

          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
              mb: 10,
            }}
          >
            {/* without inline-block nft name and image are rendered same line */}
            {nft.fileType.includes("image") ? (
              <Image
                src={nft.src}
                sx={{ maxHeight: 500, height: "50%", width: "auto" }}
                alt="image"
              />
            ) : (
              <>
                <video controls autoPlay name="media" crossOrigin="anonymous">
                  <source src={nft.src} type="video/mp4" />
                </video>
              </>
            )}
          </Flex>
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
        <h4 sx={{ display: "inline-block" }}>Wallet: {addr}</h4>
      </Flex>
      <Box sx={{ alignItems: "center", maxWidth: "50%", ml: "30%" }}>
        {loaded && <MapCollection collection={collection} />}
      </Box>
    </>
  )
}

export default Collection
