/** @jsxImportSource theme-ui */
import { SwitchTransition, Transition } from "react-transition-group"

import {
  Card,
  Image,
  Flex,
  Heading,
  Text,
  Box,
  Badge,
  Divider,
  Alert,
} from "@theme-ui/components"
import { Children } from "react"

export const StyledNftImage = ({ nftState }) => {
  return (
    <Card
      sx={{
        borderRadius: "3",
        display: "grid",
        gridTemplateColumns: "3fr 3fr",
        border: "1px solid",
        borderColor: "border",
        boxShadow: "0 8px 16px -4px rgba(0,0,0,.1)",
      }}
    >
      <Image
        src={nftState.src}
        alt="image"
        sx={{
          height: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "3",
          borderBottomLeftRadius: "3",
        }}
      />
      <Box sx={{ p: "3" }}>
        <Heading as="h2" mb={2}>
          {nftState.name}
        </Heading>
        <Text mb={3}>
          <ul>{nftState.block.closeTo}</ul>
        </Text>
        <Flex>
          <Badge mr={1}>{nftState.pricePaid} algo</Badge>
          <Badge mr={1}>photography</Badge>
          <Badge mr={1}>travel</Badge>
        </Flex>
      </Box>
    </Card>
  )
}

export const StyledNftVideo = ({ children, nftState }) => {
  //decide on whether using children or instantiating the video in child

  return (
    <Card
      sx={{
        borderRadius: "3",
        display: "grid",
        gridTemplateColumns: "3fr 3fr",
        border: "1px solid",
        borderColor: "border",
        boxShadow: "0 8px 16px -4px rgba(0,0,0,.1)",
      }}
    >
      <Box>
        <video loop autoPlay name="media" crossOrigin="anonymous" width="100%">
          <source
            src={nftState.src}
            type="video/mp4"
            sx={{ marginLeft: "auto" }}
          />
        </video>
        {/* {children} */}
      </Box>

      <Box sx={{ p: "3" }}>
        <Heading as="h2" mb={2}>
          {nftState.name}
        </Heading>

        <Text mb={3}>
          Seller <Badge mr={1}> {nftState.block.closeto}</Badge>
        </Text>

        <Divider />

        <Text mb={3}>
          Reciever <Badge mr={1}> {nftState.block.rcv}</Badge>
        </Text>

        <Flex>
          <Badge mr={1}>{nftState.pricePaid} algo</Badge>
          <Badge mr={3}>Id: {nftState.assetId}</Badge>
          <Badge mr={1}>travel</Badge>
        </Flex>
      </Box>
    </Card>
  )
}

export const Fade = ({ in: inProp, message }) => {
  const duration = 500
  const transition = `opacity ${duration}ms ease-in-out`

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entered: {
      transition,
      opacity: 1,
    },
    exiting: {
      transition,
      opacity: 0,
    },
    exited: {
      transition,
      opacity: 0,
    },
  }
  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <Alert
            sx={{
              borderRadius: "3",
              mt: 3,
              // visibility: ` ${visibile}`,
            }}
          >
            {message}
          </Alert>
        </div>
      )}
    </Transition>
  )
}
