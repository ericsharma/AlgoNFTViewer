/** @jsxImportSource theme-ui */
import { copyToClipboard } from "../utils/utils"
import {
  Box,
  Card,
  Flex,
  Text,
  Image,
  Button,
  IconButton,
} from "@theme-ui/components"

export default function Donations({
  setAlertMessage,
  executeAlertTransistion,
}) {
  const handleCopy = () => {
    copyToClipboard(
      "QD2E5LWLAYAJLWQNF2CPUM23OZ347Z6FMDMQPLMIW7VYK5B2IES4Z2S57U"
    )
    setAlertMessage("Copied to ClipBoard!")

    executeAlertTransistion()
  }
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,

        width: "100vw",
      }}
    >
      <Card
        sx={{
          display: "grid",
        }}
      >
        <Text
          sx={{
            textAlign: "center",
            mb: 2,
            "@media (min-width: 360px)": {
              fontSize: "50%",
            },
            "@media (min-width: 600px)": {
              fontSize: "100%",
            },
          }}
        >
          Feel free to buy me a coffee ☕
        </Text>
        <Flex
          sx={{
            justifyContent: "center",
            "@media (min-width: 360px)": {
              gridTemplateColumns: "1fr",

              gridTemplateRows: `100vh 100vh 100vh`, //not sure if this is good practice
            },
          }}
        >
          <Text
            sx={{
              "@media (min-width: 360px)": {
                fontSize: "50%",
              },
              "@media (min-width: 600px)": {
                fontSize: "100%",
              },
            }}
          >
            QD2E5LWLAYAJLWQNF2CPUM23OZ347Z6FMDMQPLMIW7VYK5B2IES4Z2S57U
          </Text>
          <IconButton onClick={handleCopy}>
            <Image alt="Copy Icon" src={"/copy.svg"}></Image>
          </IconButton>
        </Flex>
        <Box sx={{ justifyItems: "center", mt: 0 }}>
          <Image
            sx={{
              "@media (min-width: 360px)": {
                maxWidth: "20%",
              },
              "@media (min-width: 600px)": {
                maxWidth: "10%",
              },
              ml: "45%",
            }}
            alt="DonationQr"
            src={"/donations.png"}
          />
        </Box>
      </Card>
    </Box>
  )
}