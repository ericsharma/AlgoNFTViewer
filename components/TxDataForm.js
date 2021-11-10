/** @jsxImportSource theme-ui */
import { Text, Box, Button, Input } from "@theme-ui/components"

export default function TxDataForm({ onSubmit, onChange, disabled }) {
  const handleKeyPress = (event) => {
    console.log(event.key)
  }
  return (
    <Box sx={{ gridArea: "3 / 2 / 7 / 8" }}>
      {/* <Text sx={{ textAlign: "center" }}>
        Submit the transaction ID of the NFT Sale
      </Text> */}
      <form>
        <Text>Enter Tx Id or Wallet Address</Text>
        <Input
          onChange={(e) => onChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        ></Input>
        <Button
          onClick={(e) => {
            e.preventDefault()

            onSubmit()
          }}
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}
