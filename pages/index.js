/** @jsxImportSource theme-ui */
import Head from "next/head";
import fetch from "node-fetch";
import { useState, useEffect, useReducer, useContext } from "react";
import { handleTxRequest } from "../components/TxDataRequest";
import TxDataForm from "../components/TxDataForm";
import { UserContext } from "../Context/UserProvider";

import {
  Box,
  Label,
  Text,
  Button,
  Heading,
  Flex,
  Link,
} from "@theme-ui/components";
import NavComponent from "../components/Nav/NavComponent";
import dynamic from "next/dynamic";
import NftReducer from "../Reducers/NftReducer";
import { ACTIONS } from "../Reducers/ACTIONS";
import { localStorageHandler } from "../DataHandlers/LocalStorage";
import { InitializeColorMode } from "@theme-ui/color-modes";

const AlgoButton = dynamic(() => import("../components/myAlgo/MyAlgoButton"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const { user, login } = useContext(UserContext);
  // const txId= 'SJCSJYSE3PGECAZCQFUDAUGS7OFSSGFNFPAYGUP6CIYPPK5YWONA'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [addr, setAddr] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);
  const intialState = {
    src: null,
    txId: null,
    formSubmitted: null,
    name: null,
    fileType: null,
    assetId: null,
    block: null,
    pricePaid: null,
  };

  const [nftState, dispatch] = useReducer(NftReducer, intialState);

  const handleReset = () => {
    console.log("hit");
    setFormSubmitted(false);
    setLoaded(false);
  };

  const handleSubmit = () => {
    handleTxRequest(dispatch, nftState, setLoaded);
    setFormSubmitted(true);
  };

  const retrieveLocalStorage = () => {
    const payload = JSON.parse(localStorage.getItem(addr));
    console.log(payload);
  };

  const handleLocalStorageSubmit = () => {
    const payload = {
      txId: nftState.txId,
      src: nftState.src,
      name: nftState.name,
      fileType: nftState.fileType,
      pricePaid: nftState.pricePaid,
    };
    localStorageHandler(addr, payload);
  };

  useEffect(() => {
    console.log(nftState.type);
  }, [nftState.type]);

  const onInputChange = (event) => {
    dispatch({
      type: ACTIONS.setTxId,
      payload: { txId: event.target.value },
    });

    console.log(nftState.txId);
  };

  console.log("userIs" + user.name);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="NFT Viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main sx={{ textAlign: "center" }}>
        <NavComponent sx={{ ml: 50 }} />
        <Flex sx={{ alignContent: "center" }}>
          <AlgoButton setAddr={setAddr} login={login} />
          <Button onClick={() => handleReset()} sx={{ ml: 5, color: "black" }}>
            {" "}
            Reset{" "}
          </Button>
          <Button
            onClick={() => handleLocalStorageSubmit()}
            sx={{ ml: 5, color: "black" }}
          >
            Save to Local Storage
          </Button>
          <Button
            onClick={() => retrieveLocalStorage()}
            sx={{ ml: 5, color: "black" }}
          >
            retrieveLocalStorage
          </Button>

          <Link href={`/${addr}`}>
            {/* <a>Go to Collection</a> */}
            go to collection
          </Link>
        </Flex>

        {loaded && nftState.fileType ? (
          nftState.fileType.includes("image") ? (
            <>
              <Text>
                {nftState.name} paid {nftState.pricePaid}
              </Text>

              <img
                src={nftState.src}
                sx={{ maxHeight: 500, height: "50%", width: "auto" }}
              />
            </>
          ) : (
            <>
              <Text>
                {nftState.name} paid {nftState.pricePaid}{" "}
              </Text>
              <video controls autoPlay name="media" crossOrigin="anonymous">
                <source src={nftState.src} type="video/mp4" />
              </video>
            </>
          )
        ) : (
          !formSubmitted && (
            <TxDataForm onChange={onInputChange} onSubmit={handleSubmit} />
          )
        )}
      </main>
    </div>
  );
}
