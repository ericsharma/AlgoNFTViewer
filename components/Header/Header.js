/** @jsxImportSource theme-ui */
import {
  Box,
  NavLink,
  Text,
  Flex,
  Badge,
  Heading,
  Grid,
  Button,
} from "@theme-ui/components"
import { ST } from "next/dist/shared/lib/utils"
import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserProvider"
import { StyledButton } from "../buttons/StyledButtons"
import { StyledHeaderLink } from "../buttons/StyledLinks"
import { userTruncator } from "../utils/utils"
import dynamic from "next/dynamic"
const AlgoButton = dynamic(() => import("../myAlgo/MyAlgoButton"), {
  ssr: false,
})

export default function Header({
  executeAlertTransition,
  setAlertMessage,
  setAlertError,
}) {
  const { login, user, setUserToSession } = useContext(UserContext)
  useEffect(() => {
    console.log("dont do every time")
    setUserToSession()
  })

  const handleCollectionLink = (e) => {
    if (localStorage.getItem(user) === null) {
      e.preventDefault()
      setAlertError()
      setAlertMessage("Please save something to localstorage before proceeding")
      executeAlertTransition()
      return
    }
  }

  return (
    <Grid
      sx={{
        mt: 5,
        "@media (min-width: 551px)": { gridTemplateColumns: "1fr 15fr 1fr " },
        gridTemplateRows: "48px",
        "@media (max-width: 550px)": {
          gridTemplateColumns: "1fr",
          "& > .walletBox > .walletBadge": {
            visibility: "hidden",
            display: "none",
          },
          "& > .walletBox ": {
            visibility: "hidden",
            display: "none",
          },
          "& > .innerGrid": {
            margin: 0,
            justifyContent: "space-evenly",
          },
          "& > .algoBox > .algoButton": {
            visibility: "hidden",
            display: "none",
          },
          "& > .algoBox": {
            visibility: "hidden",
            display: "none",
          },
        },
      }}
    >
      <Box className="walletBox" sx={{ mr: "auto" }}>
        {user && (
          <Badge
            className="walletBadge"
            title={user}
            sx={{ cursor: "pointer" }}
          >
            {userTruncator(user)}
          </Badge>
        )}
      </Box>
      <Flex className="innerGrid" sx={{ justifyContent: "space-evenly" }}>
        <Grid
          columns={[3, "1fr 2fr 1fr"]}
          sx={{
            "@media (max-width: 550px)": {
              margin: 0,
            },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <StyledHeaderLink href={"/"} defaultMessage="Home" />
          </Box>

          <Text
            className="header"
            sx={{
              fontWeight: 900,
              fontSize: "15px",
              textAlign: "center",

              // "@media (max-width: 550px)": { fontSize: "5vw" },
            }}
          >
            {" "}
            Algorand NFT Viewer{" "}
          </Text>

          <Box sx={{ textAlign: "center" }}>
            {user && (
              <Button
                sx={{ all: "unset" }}
                onClick={(e) => handleCollectionLink(e)}
              >
                <StyledHeaderLink
                  onClick={(e) => handleCollectionLink(e)}
                  href={`/${sessionStorage.getItem("user")}`}
                  defaultMessage="Collection"
                ></StyledHeaderLink>
              </Button>
            )}
          </Box>
        </Grid>
      </Flex>
      <Box className="algoBox" sx={{ ml: "auto", mr: 1 }}>
        {!user && <AlgoButton className="algoButton" login={login} />}
      </Box>
    </Grid>
  )
}
