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
        gridTemplateColumns: "repeat(8, 1fr)",
        gridColumn: "1/9",

        gridRow: "1/2",
      }}
    >
      {/* <Flex sx={{ gridColumn: "4/7", justifyContent: "space-between" }}> */}
      <Box
        sx={{
          textAlign: "center",
          "@media (min-width: 360px)": { ml: 2, gridColumn: "1/2" },
          "@media (min-width: 800px)": { gridColumn: "3/4" },
        }}
      >
        <StyledHeaderLink sx={{}} href={"/"} defaultMessage="Home" />
      </Box>

      <Box
        sx={{
          textAlign: "center",
          "@media (min-width: 360px)": { ml: 2, gridColumn: "2/7" },
          "@media (min-width: 800px)": { gridColumn: "4/7" },
        }}
      >
        <Text
          className="header"
          sx={{
            fontWeight: 900,
            fontSize: "1.1em",
            textAlign: "center",

            // "@media (max-width: 550px)": { fontSize: "5vw" },
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
              gridColumn: "-1/-3",
              alignSelf: "flex-start",
            },
            "@media (min-width: 800px)": {
              gridColumn: "7/8",
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
            mr: 1,
            "@media (min-width: 360px)": {
              gridColumn: "-1/-3",
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

      {/* {!user ? (
        <AlgoButton
          className="algoButton"
          login={login}
          sx={{ gridColumn: "-1/-3 ", mr: 1, "z-index": "3" }}
        />
      ) : (
        <Badge
          className="walletBadge"
          title={user}
          sx={{
            cursor: "pointer",
            "@media (min-width: 360px)": { display: "none" },
            "@media (min-width: 800px)": {
              gridColumn: "-1/-2",
              display: "block",
            },
          }}
        >
          {userTruncator(user)}
        </Badge>
      )} */}
    </Flex>

    // <Grid
    //   sx={{
    //     "@media (min-width: 768px)": {
    //       gridTemplateColumns: "1fr 3fr 1fr ",
    //     },

    //     gridTemplateRows: "48px",
    //     "@media (max-width: 767px)": {
    //       gridTemplateColumns: "1fr",
    //       "& > .walletBox > .walletBadge": {
    //         visibility: "hidden",
    //         display: "none",
    //       },
    //       "& > .walletBox ": {
    //         visibility: "hidden",
    //         display: "none",
    //       },
    //       "& > .innerGrid": {
    //         margin: 0,
    //         justifyContent: "space-between",
    //       },
    //       "& > .algoBox > .algoButton": {
    //         visibility: "hidden",
    //         display: "none",
    //       },
    //       "& > .algoBox": {
    //         visibility: "hidden",
    //         display: "none",
    //       },
    //     },
    //   }}
    // >
    //   <Box className="walletBox" sx={{ mr: "auto" }}>
    //     {user && (
    //       <Badge
    //         className="walletBadge"
    //         title={user}
    //         sx={{ cursor: "pointer" }}
    //       >
    //         {userTruncator(user)}
    //       </Badge>
    //     )}
    //   </Box>
    //   {/* <Flex className="innerGrid" sx={{ justifyContent: "space-evenly" }}> */}
    //   <Grid
    //     columns={[3, "2fr 10fr 2fr"]}
    //     sx={{
    //       "@media (max-width: 550px)": {
    //         margin: 0,
    //       },
    //     }}
    //   >
    //     <Box sx={{ textAlign: "center" }}>
    //       <StyledHeaderLink href={"/"} defaultMessage="Home" />
    //     </Box>
    //     <Box sx={{ textAlign: "center" }}>
    //       <Text
    //         className="header"
    //         sx={{
    //           fontWeight: 900,
    //           fontSize: "1.1em",
    //           textAlign: "center",

    //           // "@media (max-width: 550px)": { fontSize: "5vw" },
    //         }}
    //       >
    //         {" "}
    //         Algorand NFT Viewer{" "}
    //       </Text>
    //     </Box>

    //     <Box sx={{ textAlign: "center" }}>
    //       {user && (
    //         <Button
    //           sx={{ all: "unset" }}
    //           onClick={(e) => handleCollectionLink(e)}
    //         >
    //           <StyledHeaderLink
    //             onClick={(e) => handleCollectionLink(e)}
    //             href={`/${sessionStorage.getItem("user")}`}
    //             defaultMessage="Collection"
    //           ></StyledHeaderLink>
    //         </Button>
    //       )}
    //     </Box>
    //   </Grid>
    //   {/* </Flex> */}
    //   <Box className="algoBox" sx={{ ml: "auto", mr: 1 }}>
    //     {!user && <AlgoButton className="algoButton" login={login} />}
    //   </Box>
    // </Grid>
  )
}
