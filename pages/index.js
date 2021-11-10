/** @jsxImportSource theme-ui */
import HomeGrid from "../components/Display/HomeGrid"
import Head from "next/head"
import fetch from "node-fetch"
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useReducer,
  useContext,
} from "react"
import {
  handleTxRequest,
  handleAddressRequest,
} from "../components/TxDataRequest"
import TxDataForm from "../components/TxDataForm"
import { UserContext } from "../Context/UserProvider"
import Header from "../components/Header/Header"
import ActionButtons from "../components/Nav/ActionButtons"
import { Spinner } from "@theme-ui/components"
import DisplayNft from "../components/Display/DisplayNft"
import Welcome from "../components/Welcome/Welcome"
import { Fade } from "../components/Display/styles"
import StyledAddressNfts from "../components/Display/MapNfts"
import Donations from "../components/Header/Donations"
import TitleTransition from "../components/Loading/Loading"

import { AlertContext } from "../components/Alert/AlertProvider"

import { Box, Alert, Flex, Link, Text } from "@theme-ui/components"
// import dynamic from "next/dynamic"
import NftReducer from "../Reducers/NftReducer"
import { ACTIONS } from "../Reducers/ACTIONS"
import { localStorageHandler } from "../DataHandlers/LocalStorage"

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const { logout } = useContext(UserContext)
  const [start, setStart] = useState(false) // think of something better
  const [formInput, setFormInput] = useState(null)
  const [addressArray, setAddressArray] = useState(null)

  const [status, setStatus] = useState(null)

  const {
    setAlertMessage,
    alertMessage,
    setAlertError,
    executeAlertTransition,
    triggerTransition,
    error,
  } = useContext(AlertContext)

  const initialState = {
    src: null,
    txId: null,
    formSubmitted: null,
    name: null,
    fileType: null,
    assetId: null,
    block: null,
    pricePaid: null,
    timestamp: null,
  }

  const txSubmitted = status === "tx"
  const addressSubmitted = status === "addr"

  const [nftState, dispatch] = useReducer(NftReducer, initialState)

  const handleFormReset = () => {
    setStatus("reset")
    setFormInput(null)
    setAddressArray(null)

    setLoaded(false)
    setAlertMessage("The form has been reset")
    dispatch({ type: ACTIONS.reset, payload: initialState })
    executeAlertTransition()
  }

  const handleSubmit = () => {
    if (!formInput) {
      handleTxRequest(dispatch, nftState, setLoaded)
      setStatus("tx")
      // setTxSubmitted(true)
    } else {
      handleAddressRequest(
        dispatch,
        nftState,
        setLoaded,
        formInput,
        setAddressArray
      )
      setStatus("addr")
    }
  }

  const handleLocalStorageSubmit = () => {
    const sessionedUser = sessionStorage.getItem("user")
    if ((!nftState.txId && !addressSubmitted) || !sessionedUser) {
      setAlertError()
      setAlertMessage("Either login or submit a valid transaction id")
      executeAlertTransition()
      throw "Either login or submit a valid transaction id"
    }

    // if (addressSubmitted && sessionedUser !== formInput) {
    //   setAlertError()
    //   setAlertMessage(
    //     "Sorry, you can only save to a wallet that belongs to you"
    //   )
    //   executeAlertTransition()
    //   throw "Sign in with the right wallet address"
    // }

    const payload = {
      txId: nftState.txId ? nftState.txId : null,
      assetId: nftState.assetId,
      src: nftState.src,
      name: nftState.name,
      fileType: nftState.fileType,
      pricePaid: nftState.pricePaid,
      block: nftState.block,
      timestamp: nftState.timestamp,
    }
    const setters = {
      setAlertMessage: setAlertMessage,
      setAlertError: setAlertError,
      executeAlertTransition: executeAlertTransition,
    }
    if (!nftState.txId) {
      localStorageHandler(sessionedUser, addressArray, setters)
    } else {
      localStorageHandler(sessionedUser, payload, setters)
    }
  }
  const handleLocalStorageReset = () => {
    sessionStorage.clear()
    localStorage.clear()
    setLoaded(false)
    logout()
    setAlertMessage("Local Storage has been reset")
    executeAlertTransition()
    console.log("cleared")
  }

  const onInputChange = (event) => {
    if (event.target.value.length === 52) {
      dispatch({
        type: ACTIONS.setTxId,
        payload: { txId: event.target.value },
      })
    } else {
      setFormInput(event.target.value)
    }
  }

  if (!start) return <Welcome setStart={setStart} />

  return (
    <div
      sx={{
        width: "100%",
        height: "100%",
        margin: "0px",
        padding: "0px",
        overflow: "hidden",
      }}
    >
      <Head>
        <title>NFT Viewer</title>
        <meta name="description" content="NFT Viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomeGrid>
          <Header
            setAlertError={setAlertError}
            setAlertMessage={setAlertMessage}
            executeAlertTransition={executeAlertTransition}
          />
          <Box
            sx={{
              "@media (min-width: 360px)": {
                display: "none",
              },
              "@media (min-width: 800px)": {
                display: "revert",
                ml: "30%",
                mr: "30%",
              },
            }}
          >
            {" "}
            <Fade in={triggerTransition} message={alertMessage} error={error} />
          </Box>

          {addressSubmitted && loaded && (
            <StyledAddressNfts array={addressArray} />
          )}

          <ActionButtons
            formReset={handleFormReset}
            storageSubmit={handleLocalStorageSubmit}
            storageReset={handleLocalStorageReset}
          />

          {(txSubmitted || addressSubmitted) && !loaded && (
            <>
              <Spinner /> <TitleTransition interval={2000} />
            </>
          )}
          {/* nftState.fileType ensures its loaded but nead to figure out how to differentiate this from the newly added address query */}
          {loaded && nftState.fileType ? (
            <DisplayNft
              nftState={nftState}
              storageSubmit={handleLocalStorageSubmit}
            />
          ) : (
            !(txSubmitted || addressSubmitted) && (
              <TxDataForm onChange={onInputChange} onSubmit={handleSubmit} />
            )
          )}

          <Donations
            setAlertMessage={setAlertMessage}
            executeAlertTransistion={executeAlertTransition}
          />
        </HomeGrid>
      </main>
    </div>
  )
}
