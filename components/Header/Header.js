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
    <Flex
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(16, 1fr)",
        gridColumn: "1/17",

        gridRow: "1/2",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          "@media (min-width: 360px)": { ml: 2, gridColumn: "1/3" },
          "@media (min-width: 800px)": { gridColumn: "4/6" },
        }}
      >
        <StyledHeaderLink sx={{}} href={"/"} defaultMessage="Home" />
      </Box>

      <Box
        sx={{
          textAlign: "center",
          "@media (min-width: 360px)": { gridColumn: "6 /14" },
          "@media (min-width: 800px)": { gridColumn: "6/12" },
        }}
      >
        <Text
          sx={{
            fontWeight: 900,

            fontSize: "1em",
            textAlign: "center",
          }}
        >
          {" "}
          Algorand NFT Viewer{" "}
        </Text>
      </Box>

      {user ? (
        <Button
          sx={{
            all: "unset",
            "@media (min-width: 360px)": {
              gridColumn: "-2/-3",
              alignSelf: "flex-start",
            },
            "@media (min-width: 800px)": {
              gridColumn: "12/14",
              alignSelf: "flex-start",
              textAlign: "center",
            },
          }}
          onClick={(e) => handleCollectionLink(e)}
        >
          <StyledHeaderLink
            onClick={(e) => handleCollectionLink(e)}
            href={`/${sessionStorage.getItem("user")}`}
            defaultMessage="Collection"
          ></StyledHeaderLink>
        </Button>
      ) : (
        <Box
          sx={{
            "@media (min-width: 360px)": {
              gridColumn: "-1/-4",
            },

            "@media (min-width: 800px)": {
              gridColumn: "-1/-2",
              alignSelf: "flex-start",
            },
          }}
        >
          <AlgoButton className="algoButton" login={login} />
        </Box>
      )}

      {user && (
        <Box sx={{ "@media (min-width: 800px)": { gridColumn: "-1" } }}>
          <Badge
            className="walletBadge"
            title={user}
            sx={{
              cursor: "pointer",
              "@media (min-width: 360px)": { display: "none" },
              "@media (min-width: 800px)": {
                display: "inline",
              },
            }}
          >
            {userTruncator(user)}
          </Badge>
        </Box>
      )}
    </Flex>
  )
}
