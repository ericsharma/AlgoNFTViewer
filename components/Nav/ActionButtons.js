/** @jsxImportSource theme-ui */
import { Box, NavLink, Text, Flex, Button } from "@theme-ui/components"
import { StyledButton } from "../buttons/StyledButtons"

export default function ActionButtons({
  formReset,
  storageSubmit,
  storageReset,
}) {
  return (
    <Flex
      as="nav"
      sx={{
        width: "100%",
        "@media (min-width: 360px)": { gridArea: "2 / 2 / 3 / 8" },
        "@media (min-width: 800px)": { gridArea: "2 / 3 / 3 / 7" },
      }}
    >
      <Button
        onClick={formReset}
        sx={{
          border: "1px solid",
          borderColor: "border",
          textAlign: "center",
          borderRadius: 0,
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
        }}
      >
        Reset Form
      </Button>
      <Button
        onClick={storageSubmit}
        sx={{
          border: "1px solid",
          borderColor: "border",
          textAlign: "center",
          borderRadius: "0",
        }}
      >
        Save to Local Storage
      </Button>
      <Button
        onClick={storageReset}
        sx={{
          border: "1px solid",
          borderColor: "border",
          textAlign: "center",
          borderRadius: 0,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        Reset Local Storage
      </Button>
    </Flex>
  )
}
