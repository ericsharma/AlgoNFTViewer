/** @jsxImportSource theme-ui */
import { CSSTransition } from "react-transition-group"
import { useRef } from "react"

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
  Button,
  Link,
  IconButton,
  Date,
} from "@theme-ui/components"
import { truncate } from "../utils/utils"

const StyledDate = ({ date }) => {
  //focusing on more imporant things first
  const dateArr = date.split(" ")
}

export const AlgoIcon = ({ price }) => (
  <>
    <IconButton sx={{ ml: "auto" }}>
      <Text sx={{ mr: 1, fontSize: "1.3em" }}> {price}</Text>
      <Image
        sx={{
          height: "60%",
        }}
        alt="Algo Icon"
        src={"/AlgoSvg.svg"}
      ></Image>
    </IconButton>
  </>
)
export const StyledRow = ({
  title,
  value,
  address = false,
  divider = false,
  price = false,
  tx = false,
  date = false,
}) => {
  const displayedValue = address ? truncate(value) : value

  if (price || date)
    //Make a two item entry compataible with the 3 column grid
    return (
      <>
        <Flex
          sx={{
            display: "grid",
            "@media (min-width: 600px)": {
              gridTemplateColumns: "2fr  7fr",
            },
            "@media (max-width: 600px)": {
              gridTemplateColumns: "3fr  6fr",
            },
          }}
        >
          <Flex sx={{ alignItems: "center" }}>
            <Text as="div" color="text3">
              {title}
            </Text>
          </Flex>
          <Flex>
            {price ? (
              <AlgoIcon price={displayedValue} />
            ) : (
              <Text sx={{ ml: "auto" }}> {value}</Text>
            )}
          </Flex>
        </Flex>
        {divider && <Divider />}
      </>
    )

  return (
    <>
      <Flex
        sx={{
          display: "grid",
          // gridTemplateColumns: "2fr 5fr 2fr",

          "@media (min-width: 600px)": {
            gridTemplateColumns: "2fr 5fr 2fr",
          },

          "@media (max-width: 600px)": {
            gridTemplateColumns: "3fr 6fr",
          },
        }}
      >
        <Flex sx={{ alignItems: "center" }}>
          <Text as="div" color="text3">
            {title}
          </Text>
        </Flex>

        <Flex
          sx={{
            justifyContent: "center",
            "@media (max-width: 600px)": { display: "none" },
          }}
        >
          <Text sx={{ "@media (max-width: 600px)": { display: "none" } }}>
            {displayedValue}
          </Text>
        </Flex>

        {address && (
          <Badge>
            <Link
              href={
                tx
                  ? `https://algoexplorer.io/tx/${value}`
                  : `https://algoexplorer.io/address/${value}`
              }
            >
              View on Algoexplorer
            </Link>
          </Badge>
        )}
      </Flex>
      {divider && <Divider />}
    </>
  )
}

export const StyledNftImage = ({ nftState, storageSubmit }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxHeight: "100%",
        objectFit: "cover",
        borderRadius: "3",
        display: "grid",
        "@media (min-width: 1000px)": {
          gridTemplateColumns: "3fr 3fr",
        },
        "@media (min-width: 1000px)": {
          gridTemplateColumns: "3fr 3fr",
        },
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
        <Heading as="h2" mb={4}>
          {nftState.name}
        </Heading>
        <Divider />
        <StyledRow
          title={"Transaction ID"}
          value={nftState.txId}
          address={true}
          divider={true}
          tx={true}
        />
        <StyledRow
          title={"Creator"}
          value={nftState.block.creatorAddress}
          address={true}
          divider={true}
        />
        <StyledRow
          title="Purchaser"
          value={nftState.block.rcv}
          address={true}
          divider={true}
        />
        <StyledRow
          title="Purchase Price"
          value={nftState.pricePaid}
          divider={true}
          price={true}
        />
        <StyledRow
          title="Time of Purchase"
          value={nftState.timestamp.toString()}
          divider={true}
          date={true}
        />

        <Flex>
          <Badge mr={1}>{nftState.pricePaid}</Badge>
          <Badge mr={1}>Image/gif</Badge>
          <Badge mr={1}>travel</Badge>
        </Flex>

        <Button
          onClick={storageSubmit}
          sx={{
            border: "1px solid",
            borderColor: "border",
            textAlign: "center",
            borderRadius: "0",
            width: "50%",
          }}
        >
          Save to Local Storage?
        </Button>
      </Box>
    </Card>
  )
}

export const StyledMiniImageCard = ({ nftState, duration = 1 }) => {
  return (
    <CardFlip duration={duration}>
      <Image
        src={nftState.src}
        alt="image"
        className="frontFace"
        sx={{
          width: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "3",
          borderBottomLeftRadius: "3",
          backfaceVisibility: "hidden",
          position: "absolute",
          transition: `all ${duration}s`,
        }}
      />

      <Button
        className="backFace"
        sx={{
          objectFit: "cover",
          position: "absolute",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          transition: `all ${duration}s`,
        }}
      >
        <Link
          className="backFaceButton"
          sx={{ textAlign: "center" }}
          href={`/${nftState.block.rcv}/${nftState.txId}`}
        >
          {" "}
          See more details
        </Link>
      </Button>

      {/* THIS MAKES THE ASSUMPTION THAT THE nftState.block.rcv is the same address used to signed in */}
    </CardFlip>
  )
}

export const StyledMiniVideoCard = ({ nftState, duration = 1 }) => {
  return (
    <CardFlip
      duration={duration}
      // sx={{
      //   borderRadius: "3",
      //   border: "1px solid",
      //   borderColor: "border",
      //   boxShadow: "0 8px 16px -4px rgba(0,0,0,.1)",
      //   width: "100%",
      //   ":hover": {
      //     "& > .backFace": {
      //       transform: "rotateY(0)",
      //     },
      //     "& > .frontFace > *": {
      //       transform: "rotateY(-180deg)",
      //     },
      //   },
      //   transition: "all 1s",
      //   perspective: "1000px",

      //   postition: "relative",
      // }}
    >
      <video
        // sx={{ width: "100%", maxHeight: "100%", objectFit: "cover" }}
        className="frontFace"
        sx={{
          width: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "3",
          borderBottomLeftRadius: "3",
          backfaceVisibility: "hidden",
          transition: `all ${duration}s`,

          position: "absolute",
        }}
        loop
        autoPlay
        muted
        name="media"
        crossOrigin="anonymous"
        width="100%"
      >
        <source src={nftState.src} type="video/mp4" />
      </video>
      {/* {children} */}

      <Button
        // sx={{ height: "100%", objectFit: "cover" }}
        className="backFace"
        sx={{
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          transition: `all ${duration}s`,
        }}
      >
        <Link
          className="backFaceButton"
          sx={{
            textAlign: "center",
          }}
          href={`/${nftState.block.rcv}/${nftState.txId}`}
        >
          {" "}
          See more details
        </Link>
      </Button>

      {/* THIS MAKES THE ASSUMPTION THAT THE nftState.block.rcv is the same address used to signed in */}
    </CardFlip>
  )
}

export const StyledNftVideo = ({ children, nftState, storageSubmit }) => {
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
          <source src={nftState.src} type="video/mp4" />
        </video>
        {/* {children} */}
      </Box>

      <Box sx={{ p: "3" }}>
        <Heading as="h2" mb={4}>
          {nftState.name}
        </Heading>
        <Divider />
        <StyledRow
          title={"Transaction ID"}
          value={nftState.txId}
          address={true}
          divider={true}
          tx={true}
        />
        <StyledRow
          title={"Creator"}
          value={nftState.block.creatorAddress}
          address={true}
          divider={true}
        />
        <StyledRow
          title="Purchaser"
          value={nftState.block.rcv}
          address={true}
          divider={true}
        />
        <StyledRow
          title="Purchase Price"
          value={nftState.pricePaid}
          divider={true}
          price={true}
        />
        <StyledRow
          title="Time of Purchase"
          value={nftState.timestamp.toString()}
          divider={true}
          date={true}
        />
        <Flex>
          <Badge mr={1}>{nftState.pricePaid}</Badge>
          <Badge mr={1}>Video</Badge>
          <Badge mr={1}>travel</Badge>
        </Flex>

        <Button
          onClick={storageSubmit}
          sx={{
            border: "1px solid",
            borderColor: "border",
            textAlign: "center",
            borderRadius: "0",
            width: "50%",
          }}
        >
          Save to Local Storage?
        </Button>
      </Box>
    </Card>
  )
}

export const Fade = ({ in: inProp, message, error }) => {
  const duration = 500
  const transition = `opacity ${duration}ms ease-in-out`

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }
  const ref = useRef(null)

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
    <CSSTransition in={inProp} timeout={duration} nodeRef={ref}>
      {(state) => (
        <div
          ref={ref}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <Alert
            sx={{
              borderRadius: "3",
              mt: 3,
              bg: error ? "red" : "blue",

              // visibility: ` ${visibile}`,
            }}
          >
            {message}
          </Alert>
        </div>
      )}
    </CSSTransition>
  )
}

export const CardFlip = ({ children, duration }) => {
  const frontAndBack = [...children]
  debugger
  return (
    <Card
      sx={{
        borderRadius: "3",
        border: "1px solid",
        borderColor: "border",
        boxShadow: "0 8px 16px -4px rgba(0,0,0,.1)",
        width: "100%",
        ":hover": {
          "& > .backFace ": {
            transform: "rotateY(0)",
          },
          "& > .frontFace ": {
            transform: "rotateY(-180deg)",
          },
        },
        transition: `all ${duration}s`,
        perspective: "1000px",

        postition: "relative",
      }}
    >
      {frontAndBack[0]}

      {frontAndBack[1]}
    </Card>
  )
}
