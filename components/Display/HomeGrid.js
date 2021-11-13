/** @jsxImportSource theme-ui */
import { Grid } from "@theme-ui/components"

import { StyledNftImage, StyledNftVideo } from "../Display/styles"

export default function HomeGrid({ children }) {
  return (
    <Grid
      sx={{
        "@media (min-width: 360px)": {
          gridTemplateColumns: "repeat(16, 1fr)",
          gridTemplateRows: "7vh 4vh 4vh repeat( 5, 10vh) 5vh 5vh 7vh 7vh",
        },
        "@media (min-width: 800px)": {
          gridTemplateColumns: "repeat(16, 1fr)",
          gridTemplateRows: "7vh 3vh 4vh repeat( 5, 10vh) 5vh 5vh 7vh 7vh",
        },
        // gridTemplateColumns: "repeat(8, 1fr)",
        // gridTemplateRows: "7vh 7vh repeat( 5, 10vh) 5vh 5vh 7vh 7vh",
      }}
    >
      {children}
    </Grid>
  )
}
