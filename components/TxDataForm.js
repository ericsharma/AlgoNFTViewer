/** @jsxImportSource theme-ui */
import { Label, Box, Button, Input } from "@theme-ui/components"

export default function TxDataForm({ onSubmit, onChange, disabled }) {
  const handleKeyPress = (event) => {
    console.log(event.key)
  }
  return (
    <Box>
      <Label sx={{ textAlign: "center" }}>
        Submit the transaction ID of the NFT Sale
      </Label>
      <form>
        <Label sx={{ mb: 1, mt: 2, textAlign: "center" }}>
          Enter Tx Id below
        </Label>
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
