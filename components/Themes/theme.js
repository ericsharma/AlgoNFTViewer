const darks = {
  zero: "#000",
  one: "#161718",
  two: "#2C2E30",
  three: "#44474A",
  four: "#5B5F63",
  five: "#73787D",
  six: "#8A9096",
  seven: "#A1A9B0",
}

const lights = {
  one: "#BBC2C9",
  two: "#D3DBE3",
  three: "#E9ECF0",
  four: "#F2F5F7",
  five: "#FAFBFC",
  six: "#FFF",
}

const brand = {
  one: "#D4E8FC",
  two: "#ABD3FC",
  three: "#83BFFC",
  four: "#5BABFC",
  five: "#1A8CFF",
  six: "#007EFC",
  seven: "#0071E3",
  eight: "#0065C9",
  nine: "#0058B0",
  ten: "#004B96",
  eleven: "#003E7D",
}

const error = {
  one: "#FFE3E3",
  two: "#F7C3C3",
  three: "#F09C9C",
  four: "#E87171",
  five: "#F05151",
  six: "#E84444",
  seven: "#DF4040",
  eight: "#B53535",
  nine: "#9C2E2E",
  ten: "#822626",
  eleven: "#691F1F",
}

const success = {
  one: "#E4F5EC",
  two: "#C5EBD6",
  three: "#A2DBBD",
  four: "#75D9A3",
  five: "#5BCF90",
  six: "#44C881",
  seven: "#40BD79",
  eight: "#32945F",
  nine: "#2D8556",
  ten: "#28754C",
  eleven: "#21613F",
}

const warn = {
  one: "#FFF0D4",
  two: "#FFE2AB",
  three: "#FFD687",
  four: "#FFCE6E",
  five: "#FFC554",
  six: "#FFBC3B",
  seven: "#E5A935",
  eight: "#CC972F",
  nine: "#B28429",
  ten: "#996C14",
  eleven: "#66480D",
}

const systemFonts =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const space = [
  // +4
  "0",
  "4px",
  "8px",
  "12px",
  "16px",
  // +8
  "24px",
  "32px",
  "40px",
  "48px",
  // +16
  "64px",
  "80px",
  "96px",
  "112px",
  // +32
  "144px",
  "176px",
  "208px",
  "224px",
]

export const theme = {
  space,
  sizes: space,
  breakpoints: ["544px", "768px", "1012px", "1280px"],
  fonts: {
    body: systemFonts,
    heading: systemFonts,
    monospace:
      'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontWeights: {
    body: 400,
    headings: 700,
    normal: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontSizes: ["12px", "14px", "16px", "20px", "24px", "32px", "40px", "48px"],
  radii: ["0", "2px", "4px"],
  colors: {
    text: darks.one,
    secondaryText: darks.two,
    tertiaryText: darks.three,
    background: lights.four,
    primary: brand.six,
    secondary: brand.one,
    accent: success.six,
    muted: lights.five,
    border: lights.three,
    darks,
    lights,
    error: {
      ...error,
      default: error.six,
      text: error.eleven,
      wash: error.one,
      border: error.two,
    },
    success: {
      ...success,
      default: success.six,
      text: success.eleven,
      wash: success.one,
      border: success.two,
    },
    warn: {
      ...warn,
      default: warn.six,
      text: warn.eleven,
      wash: warn.one,
      border: warn.two,
    },
    brand: {
      ...brand,
      default: brand.six,
      text: brand.eleven,
      wash: brand.one,
      border: brand.two,
    },
  },
  shadows: {
    small: "0px 1px 2px rgba(0, 0, 0, 0.02)",
    medium: "0px 1px 4px rgba(0, 0, 0, 0.04)",
    large: "0px 1px 8px rgba(0, 0, 0, 0.08)",
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
  },
  buttons: {
    primary: {
      bg: "text",
      color: "background",
      fontSize: 1,
      fontFamily: "body",
      fontVariationSettings: `'wght' 200`,
      width: "100%",
      height: "56px",
      cursor: "pointer",
      borderRadius: "md",
      transition: "0.1s",
      lineHeight: "1em",
      "&:hover:enabled": {
        transform: "scale(1.01)",
      },
      "&:active:enabled": {
        transform: "scale(0.99)",
      },
      "&:focus": {
        outline: "none",
      },
      "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    remove: {
      variant: "buttons.primary",
      width: "100%",
      color: "red",
      borderColor: "red",
      transition: "0.1s",
      "&:focus": {
        outline: "none",
      },
      "&:disabled": {
        borderColor: "border1",
        cursor: "not-allowed",
        bg: "surface2",
      },
    },
    textButton: {
      bg: "transparent",
      border: "none",
      cursor: "pointer",
      fontFamily: "body",
      opacity: 1,
      p: 0,
      "&:hover:enabled": {
        filter: "brightness(1.5)",
      },
      "&:active": {
        filter: "brightness(1.5)",
        opacity: 0.8,
      },
      "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
      "&:focus": {
        outline: "none",
      },
    },
    icon: {
      cursor: "pointer",
    },
  },
  forms: {
    label: {
      fontSize: 2,
      color: "text",
      mt: 4,
      mr: 0,
      width: "auto",
      fontVariationSettings: `'wght' 500`,
    },
    input: {
      variant: "text.default",
      border: "2px solid",
      borderColor: darks.six,
      borderRadius: "md",
      fontSize: 3,
      height: "56px",
      my: 2,
      pl: 4,
      "&:focus": {
        outline: "none",
        borderColor: "purpleMuted",
      },
      "&:disabled": {
        cursor: "not-allowed",
      },
    },
    search: {
      variant: "text.default",
      border: "none",
      fontSize: 3,
      fontFamily: "heading",
      fontWeight: "book",
      p: 0,
      height: "48px",
      width: "100%",
      "&:focus": {
        outline: "none",
        color: "text",
      },
    },
    select: {
      variant: "text.default",
      border: "2px solid",
      borderColor: "border1",
      cursor: "pointer",
      fontSize: 3,
      flexShrink: 1,
      height: "56px",
      width: "115px",
      ml: 2,
      pl: 3,
      borderRadius: "md",
      "&:focus": {
        outline: "none",
        borderColor: "purpleMuted",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.8,
        backgroundColor: "surface1",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        right: 4,
        width: "0.7em",
        height: "0.4em",
        backgroundColor: "white",
        clipPath: "polygon(100% 0%, 0 0%, 50% 100%)",
        alignSelf: "center",
      },
    },
    switch: {
      backgroundColor: "background",
      border: "2px solid",
      // py: '6px',
      height: "32px",
      width: "56px",
      borderColor: "border3",
      mr: 0,
      "& > div": {
        backgroundColor: "border3",
        height: "24px",
        width: "24px",
      },
      "input: checked ~ &": {
        backgroundColor: "surface3",
        borderColor: "text3",
        "& > div": {
          backgroundColor: "text",
        },
      },
    },

    textarea: {
      variant: "forms.input",
      height: "auto",
    },
  },
}
