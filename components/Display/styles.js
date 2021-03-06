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
} from "@theme-ui/components"
import { truncate } from "../utils/utils"

export const Fade = ({ in: inProp, message, error }) => {
  const duration = 500
  const transition = `opacity ${duration}ms ease-in-out`

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,

    position: "absolute",
    zIndex: 10,
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
              display: "flex",
              alignItems: "center",

              bg: error ? "red" : "green",

              // visibility: ` ${visibile}`,
            }}
          >
            <Text sx={{ ml: "auto", mr: "auto" }}>{message}</Text>
          </Alert>
        </div>
      )}
    </CSSTransition>
  )
}

export const CardFlip = ({ children, duration = 1 }) => {
  const frontAndBack = [...children]

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

export const StyledImage = ({ src }) => {
  return (
    <Image
      src={src}
      alt="image"
      sx={{
        height: "100%",
        objectFit: "cover",
        borderTopLeftRadius: "3",
        borderBottomLeftRadius: "3",
      }}
    />
  )
}

export const StyledNftInformation = ({ nftState }) => {
  return (
    <>
      <Heading as="h2" mb={4}>
        {nftState.name}
      </Heading>
      <Divider />
      <StyledRow
        title={nftState.txId ? "Transaction ID" : "AssetId"}
        value={nftState.txId ? nftState.txId : nftState.assetId}
        // title={"Asset Id"}
        // value={nftState.assetId}
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
    </>
  )
}
export const StyledVideoFrontFace = ({ nftState, duration = 1 }) => {
  return (
    <video
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
        zIndex: 0,
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
  )
}

export const StyledCollectionsButtonBackFace = ({ duration = 1, nftState }) => {
  return (
    <Button
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
        href={`/${nftState.block.rcv}/${nftState.assetId}`}
      >
        See more details
      </Link>
    </Button>
  )

  {
    /* THIS MAKES THE ASSUMPTION THAT THE nftState.block.rcv is the same address used to signed in */
  }
}

const StyledNftInfoBackFace = ({ nftState, duration = 1 }) => {
  return (
    <Card
      className="backFace"
      sx={{
        height: "100%",
        objectFit: "cover",
        display: "inline-block",
        // position: "absolute", //I have no Idea why the combination of display inline-block and removing absolute works but it does
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        transition: `all ${duration}s`,
      }}
    >
      <Heading as="h2" mb={4}>
        {nftState.name}
      </Heading>
      <Divider />
      <StyledRow
        title={nftState.txId ? "Transaction ID" : "AssetId"}
        value={nftState.txId ? nftState.txId : nftState.assetId}
        // title={"Asset Id"}
        // value={nftState.assetId}
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
    </Card>
  )
}

export const StyledImageFrontFace = ({ nftState, duration = 1 }) => {
  return (
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

        zIndex: 0,
      }}
    />
  )
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
        borderRadius: "3",
        display: "grid",

        "@media (min-width: 360px)": {
          gridArea: "4/2/9/16",
        },
        "@media (min-width: 800px)": {
          gridArea: "4/4/4/16",
        },
        border: "1px solid",
        borderColor: "border",
        boxShadow: "0 8px 16px -4px rgba(0,0,0,.1)",
      }}
    >
      <Flex>
        <StyledImage src={nftState.src} />
        <Box sx={{ p: "3" }}>
          <StyledNftInformation nftState={nftState} />
          {/* <Button
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
        </Button> */}
        </Box>
      </Flex>
    </Card>
  )
}

export const StyledMiniImageCard = ({ nftState, duration = 1 }) => {
  return (
    <CardFlip duration={duration}>
      <StyledImageFrontFace duration={duration} nftState={nftState} />

      <StyledCollectionsButtonBackFace
        duration={duration}
        nftState={nftState}
      />

      {/* THIS MAKES THE ASSUMPTION THAT THE nftState.block.rcv is the same address used to signed in */}
    </CardFlip>
  )
}

export const StyledNftVideo = ({ children, nftState, storageSubmit }) => {
  //decide on whether using children or instantiating the video in child

  return (
    <Card
      sx={{
        display: "grid",

        "@media (min-width: 360px)": {
          gridArea: "4/2/9/16",
        },
        "@media (min-width: 800px)": {
          gridArea: "4/4/4/16",
        },

        borderRadius: "3",

        border: "1px solid",
        borderColor: "border",
        boxShadow: "0 8px 16px -4px rgba(0,0,0,.1)",
      }}
    >
      <Flex
        sx={{
          "@media (min-width: 360px)": {
            gridArea: "4/2/9/16",
          },
          "@media (min-width: 800px)": {
            gridArea: "4/4/4/16",
          },
        }}
      >
        <Box>
          <video
            loop
            autoPlay
            name="media"
            crossOrigin="anonymous"
            // sx={{ maxHeight: "50%" }}
          >
            <source src={nftState.src} type="video/mp4" />
          </video>
        </Box>

        {/* {children} */}

        <Box sx={{ p: "3" }}>
          <StyledNftInformation nftState={nftState} />
          {/* 
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
        </Button> */}
        </Box>
      </Flex>
    </Card>
  )
}
export const StyledMiniVideoCard = ({ nftState, duration = 1 }) => {
  return (
    <CardFlip duration={duration}>
      <StyledVideoFrontFace nftState={nftState} duration={duration} />
      <StyledCollectionsButtonBackFace
        nftState={nftState}
        duration={duration}
      />
    </CardFlip>
  )
}

export const AddressImageNftDisplay = ({ nftState, duration = 1 }) => {
  return (
    <CardFlip duration={duration}>
      <StyledImageFrontFace nftState={nftState} />
      <StyledNftInfoBackFace nftState={nftState} />
    </CardFlip>
  )
}
export const AddressVideoNftDisplay = ({ nftState, duration = 1 }) => {
  return (
    <CardFlip duration={duration}>
      <StyledVideoFrontFace nftState={nftState} />
      <StyledNftInfoBackFace nftState={nftState} />
    </CardFlip>
  )
}
