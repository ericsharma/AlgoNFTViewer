import { Button, Flex } from "theme-ui"

const StyledText = ({ defaultText }) => (
  <Flex sx={{ alignItems: "center", justifyContent: "center", color: "black" }}>
    {defaultText}
  </Flex>
)

export const StyledButton = ({ onClick, disabled, defaultText }) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    sx={{
      display: "inline-block",
      verticalAlign: "middle",
      bg: "#79BD9A",
      transform: "translateZ(0)",
      "&:hover": { transform: "translateY(-8px)" },
      boxShadow: "0 0 1px rgba(0, 0, 0, 0)",
      backfaceVisibility: "hidden",
      MozOsxFontSmoothing: "grayscale",

      transitionDuration: " 0.3s",
      transitionProperty: "transform",
      transitionTimingFunction: " ease-out",
    }}
  >
    <StyledText defaultText={defaultText} />
  </Button>
)
