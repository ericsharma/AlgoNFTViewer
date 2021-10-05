/** @jsxImportSource theme-ui */
import Head from "next/head"
import fetch from "node-fetch"
import { useState, useEffect, useReducer, useContext } from "react"
import { handleTxRequest } from "../components/TxDataRequest"
import TxDataForm from "../components/TxDataForm"
import { UserContext } from "../Context/UserProvider"
import { StyledButton } from "../components/buttons/StyledButtons"
import Header from "../components/Header/Header"
import ActionButtons from "../components/Nav/ActionButtons"
import { Spinner } from "@theme-ui/components"
import DisplayNft from "../components/Display/DisplayNft"
import Welcome from "../components/Welcome/Welcome"
import { StyledAlert, Fade } from "../components/Display/styles"

import { Box, Alert, Flex, Link } from "@theme-ui/components"
// import dynamic from "next/dynamic"
import NftReducer from "../Reducers/NftReducer"
import { ACTIONS } from "../Reducers/ACTIONS"
import { localStorageHandler } from "../DataHandlers/LocalStorage"

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const { logout } = useContext(UserContext)
  const [start, setStart] = useState(false) // think of something better
  const [alertMessage, setAlertMessage] = useState(null)
  const [triggerTransition, setTriggerTransition] = useState(false)
  const [error, setError] = useState(false)

  // Put these in a seperate file so you can import between index and collections.
  const executeAlertTransition = () => {
    setTriggerTransition(true)
    setTimeout(() => setTriggerTransition(false), 3000)
  }
  const setAlertError = () => {
    setError(true)
    setTimeout(() => setError(false), 4000)
  }

  const [formSubmitted, setFormSubmitted] = useState(false)

  const intialState = {
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

  const [nftState, dispatch] = useReducer(NftReducer, intialState)

  const handleFormReset = () => {
    setFormSubmitted(false)
    setLoaded(false)
    setAlertMessage("The form has been reset")
    executeAlertTransition()
  }

  const handleSubmit = () => {
    handleTxRequest(dispatch, nftState, setLoaded)
    setFormSubmitted(true)
  }

  const handleLocalStorageSubmit = () => {
    const sessionedUser = sessionStorage.getItem("user")
    if (!nftState.txId || !sessionedUser) {
      setAlertError()
      setAlertMessage("Either login or submit a valid transaction id")
      executeAlertTransition()
      throw "Either login or submit a valid transaction id"
    }

    const payload = {
      txId: nftState.txId,
      src: nftState.src,
      name: nftState.name,
      fileType: nftState.fileType,
      pricePaid: nftState.pricePaid,
    }
    const setters = {
      setAlertMessage: setAlertMessage,
      setAlertError: setAlertError,
      executeAlertTransition: executeAlertTransition,
    }
    localStorageHandler(sessionedUser, payload, setters)
  }
  const handleLocalStorageReset = () => {
    sessionStorage.clear()
    localStorage.clear()
    setFormSubmitted(false)
    setLoaded(false)
    logout()
    setAlertMessage("Local Storage has been reset")
    executeAlertTransition()

    // setTriggerTransition(true)
    // setTimeout(() => setTriggerTransition(false), 3000)
    console.log("cleared")
  }

  const onInputChange = (event) => {
    dispatch({
      type: ACTIONS.setTxId,
      payload: { txId: event.target.value },
    })
  }

  // if (!start) return <Welcome setStart={setStart} />

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

              {formSubmitted && !loaded && <Spinner />}

              {loaded && nftState.fileType ? (
                <DisplayNft
                  nftState={nftState}
                  storageSubmit={handleLocalStorageSubmit}
                />
              ) : (
                !formSubmitted && (
                  <TxDataForm
                    onChange={onInputChange}
                    onSubmit={handleSubmit}
                    disabled={formSubmitted}
                  />
                )
              )}

              <Fade
                in={triggerTransition}
                message={alertMessage}
                error={error}
              />
            </Box>
          </Flex>
        )}
      </main>
    </div>
  )
}
