/** @jsxImportSource theme-ui */
import {
  Box,
  NavLink,
  Text,
  Flex,
  Badge,
  Heading,
  Grid,
} from "@theme-ui/components"
import { ST } from "next/dist/shared/lib/utils"
import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/UserProvider"
import { StyledButton } from "../buttons/StyledButtons"
import { StyledHeaderLink } from "../buttons/StyledLinks"
import dynamic from "next/dynamic"
const AlgoButton = dynamic(() => import("../myAlgo/MyAlgoButton"), {
  ssr: false,
})

export default function Header({}) {
  const { login, user, setUserToSession } = useContext(UserContext)
  useEffect(() => {
    console.log("dont do every time")
    setUserToSession()
  })

  const userTruncator = (user) => {
    return user.slice(0, 5) + "..." + user.slice(user.length - 5, user.length)
  }
  return (
    <Grid gap={2} columns={[3, "1fr 9fr 1fr"]} sx={{ mb: 3 }}>
      <Box sx={{ mr: "auto" }}>
        {user && (
          <Badge title={user} sx={{ cursor: "pointer" }}>
            {" "}
            {userTruncator(user)}{" "}
          </Badge>
        )}
      </Box>
      <Flex sx={{ justifyContent: "center", ml: "10%", mt: 3 }}>
        <Grid gap={2} columns={[3, "1fr 2fr 1fr"]} sx={{ mb: 3 }}>
          <Box sx={{ textAlign: "center" }}>
            <StyledHeaderLink href={"/"} defaultMessage="Home" />
          </Box>

          <Box>
            <Heading> Algorand NFT viewer </Heading>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {user && (
              <StyledHeaderLink
                href={`/${sessionStorage.getItem("user")}`}
                defaultMessage="Collection"
              ></StyledHeaderLink>
            )}
          </Box>
        </Grid>
      </Flex>
      <Box sx={{ ml: "auto", mr: 1 }}>
        {!user && <AlgoButton login={login} />}
      </Box>
    </Grid>
  )
}
