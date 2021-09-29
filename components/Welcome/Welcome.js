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
  const getStarted = () => {
    setStart(true)
  }
  return (
    <>
      <Card
        sx={{
          borderRadius: "3",
          boxShadow:
            "0 8px 16px -4px rgba(0,0,0,.1), 0 0 8px -3px rgba(0,0,0,.1)",
        }}
      >
        <Box sx={{ p: "3" }}>
          <Heading as="h2" mb={2}>
            NFT VIEWER
          </Heading>
          <Text mb={3}>
            I decided to build this website to strengthen my understanding of
            the way NFT's are stored on Algorand's blockchain. It is designed in
            a severless fashion and abolutely not information is persisted
            outside of the context of your browsers local stroage. Please login
            with your algorand wallet, look for the transaction type of
            "transfer" for the NFT in question ans submit the txId, and then
            save the nft to localstorage to add to your collection. Also note
            that since the storage is dependent on your browser context, if you
            decide to clear youre cookies/ cache/ any other reset, there is a
            good chance that your NFT data will be erased.
          </Text>
          <Flex>
            <Badge mr={1}>NFT</Badge>
            <Badge mr={1}>Algorand</Badge>
            <Badge mr={1}>Personal Project</Badge>
          </Flex>
        </Box>
        <Image
          src={"/tx.png"}
          alt="image"
          sx={{ borderTopLeftRadius: "3", borderTopRightRadius: "3" }}
        />
        <Button onClick={getStarted}> Get Started?</Button>
      </Card>
    </>
  )
}
