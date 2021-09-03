/** @jsxImportSource theme-ui */
import { Label, Box, Button, Input } from "@theme-ui/components";

export default function TxDataForm({ onSubmit, onChange }) {
  return (
    <Box as="form" sx={{ display: "inline-block" }}>
      <Label> Submit Transaction ID</Label>
      <form>
        <Label sx={{ mb: 1, mt: 2 }}>Enter Tx Id</Label>
        <Input onChange={(e) => onChange(e)}></Input>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
