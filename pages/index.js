/** @jsxImportSource theme-ui */
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
import { StyledButton } from "../components/buttons/StyledButtons"
import Header from "../components/Header/Header"
import ActionButtons from "../components/Nav/ActionButtons"
import { Spinner } from "@theme-ui/components"
import DisplayNft from "../components/Display/DisplayNft"
import Welcome from "../components/Welcome/Welcome"
import { Fade } from "../components/Display/styles"
import StyledAddressNfts from "../components/Display/MapNfts"

import { Box, Alert, Flex, Link, Text } from "@theme-ui/components"
// import dynamic from "next/dynamic"
import NftReducer from "../Reducers/NftReducer"
import { ACTIONS } from "../Reducers/ACTIONS"
import { localStorageHandler } from "../DataHandlers/LocalStorage"
import { FancyInput } from "../components/transitions/Transitions"

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const { logout } = useContext(UserContext)
  const [start, setStart] = useState(false) // think of something better
  const [alertMessage, setAlertMessage] = useState(null)
  const [triggerTransition, setTriggerTransition] = useState(false)
  const [error, setError] = useState(false)
  const [formInput, setFormInput] = useState(null)
  const [addressArray, setAddressArray] = useState(null)

  const [status, setStatus] = useState(null)

  // Put these in a seperate file so you can import between index and collections.
  const executeAlertTransition = () => {
    setTriggerTransition(true)
    setTimeout(() => setTriggerTransition(false), 3000)
  }
  const setAlertError = () => {
    setError(true)
    setTimeout(() => setError(false), 4000)
  }

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
      // setAddressSubmitted(true)
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
    debugger
    if (addressSubmitted && sessionedUser !== formInput) {
      setAlertError()
      setAlertMessage(
        "Sorry, you can only save to a wallet that belongs to you"
      )
      executeAlertTransition()
      throw "Sign in with the right wallet address"
    }

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

  return (
    <div>
      <Head>
        <title>NFT Viewer</title>
        <meta name="description" content="NFT Viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header
          setAlertError={setAlertError}
          setAlertMessage={setAlertMessage}
          executeAlertTransition={executeAlertTransition}
        />

        {!start ? (
          <Welcome setStart={setStart} />
        ) : (
          <Flex sx={{ justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <ActionButtons
                formReset={handleFormReset}
                storageSubmit={handleLocalStorageSubmit}
                storageReset={handleLocalStorageReset}
              />
              {addressSubmitted && loaded && (
                <StyledAddressNfts array={addressArray} />
              )}

              {(txSubmitted || addressSubmitted) && !loaded && <Spinner />}
              {/* nftState.fileType ensures its loaded but nead to figure out how to differentiate this from the newly added address query */}
              {loaded && nftState.fileType ? (
                <DisplayNft
                  nftState={nftState}
                  storageSubmit={handleLocalStorageSubmit}
                />
              ) : (
                !(txSubmitted || addressSubmitted) && (
                  <TxDataForm
                    onChange={onInputChange}
                    onSubmit={handleSubmit}
                  />
                )
              )}
            </Box>
          </Flex>
        )}

        <Box sx={{ ml: "30%", mr: "30%" }}>
          {" "}
          <Fade in={triggerTransition} message={alertMessage} error={error} />
        </Box>
      </main>
    </div>
  )
}
