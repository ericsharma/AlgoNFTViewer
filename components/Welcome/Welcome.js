/** @jsxImportSource theme-ui */
import {
  Card,
  Image,
  Flex,
  Heading,
  Text,
  Box,
  Badge,
  Button,
} from "@theme-ui/components"

// import tx from "/tx.png"

export default function Welcome({ setStart }) {
  const wave = `👋👋👋👋👋`
  const nftHeader = `Don't own an NFT 😧 :`
  const nftTeaser = `Well stay tuned, I'm working on a streamlined process for minting NFT's according to the newly finalize ARC-003 conventions!`
  const info = ` I decided to build this website to strengthen my understanding of the
  way NFT's are stored on Algorand's blockchain. To use the site please
  enter the transaction id of an NFT transfer or enter a wallet address
  to see NFT's associated with the address.  

  
  This was designed to function with no backend and no information is persisted outside of the context of your browser's
  local stroage. 
  Also note that since the storage is dependent on your browser context,
  if you decide to clear youre cookies/ cache/ any other reset, there is
  a good chance that your NFT data will be erased.`
  const instructions1 = `Enter wallet address to see NFT's in aggregate |  | Enter the tx id associated with an NFT transfer`
  const instructions2 = `You can sign in with MyAlgo wallet and save NFT's to your collection page`
  const instructions3 = `View your NFT's whenever you want, just note that if you reset local storage (even away from the app), you'll have to go through the process again`
  function getStarted() {
    setStart(true)
  }
  return (
    <>
      <Heading
        as="h2"
        sx={{ mb: 3, display: "flex", justifyContent: "center" }}
      >
        NFT VIEWER
      </Heading>
      <Box sx={{ pl: "10%", pr: "10%" }}>
        <Card
          sx={{
            borderRadius: "3",
            boxShadow:
              "0 8px 16px -4px rgba(0,0,0,.1), 0 0 8px -3px rgba(0,0,0,.1)",
          }}
        >
          <Heading sx={{ display: "flex", justifyContent: "center" }}>
            {" "}
            {wave}
          </Heading>
          <Flex sx={{ flexDirection: "column", justifyContent: "flex-end" }}>
            <Heading>How to use: </Heading>
            <ul>
              <li> {instructions1}</li>
              <li>{instructions2}</li>
              <li>{instructions3}</li>
            </ul>

            <Heading> {nftHeader}</Heading>
            <ul>
              <li> {nftTeaser}</li>
            </ul>
          </Flex>
          <Flex sx={{ justifyContent: "center", padding: 3 }}>
            <Flex>
              <Badge mr={1}>NFT</Badge>
              <Badge mr={1}>Algorand</Badge>
              <Badge mr={1}>Personal Project</Badge>
            </Flex>
          </Flex>

          {/* <Image
            src={"/tx.png"}
            alt="image"
            sx={{ borderTopLeftRadius: "3", borderTopRightRadius: "3" }}
          /> */}
        </Card>
        <Box sx={{ mt: 3, mb: 3, ml: "20%", mr: "20%" }}>
          <Button onClick={getStarted}> Get Started?</Button>
        </Box>
      </Box>
    </>
  )
}
