/** @jsxImportSource theme-ui */
import Head from "next/head";
import fetch from "node-fetch";
import { useState, useEffect, useReducer } from "react";
import { handleTxRequest } from "../components/TxDataRequest";
import TxDataForm from "../components/TxDataForm";
import { Box, Label, Text, Button, Heading, Flex } from "@theme-ui/components";
import NavComponent from "../components/Nav/NavComponent";
import dynamic from "next/dynamic";
import NftReducer from "../Reducers/NftReducer";
import { ACTIONS } from "../Reducers/ACTIONS";
import { localStorageHandler } from "../DataHandlers/LocalStorage";

const AlgoButton = dynamic(() => import("../components/myAlgo/MyAlgoButton"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // const txId= 'SJCSJYSE3PGECAZCQFUDAUGS7OFSSGFNFPAYGUP6CIYPPK5YWONA'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [type, setType] = useState("");
  const [addr, setAddr] = useState("");

  const [nftState, dispatch] = useReducer(NftReducer, {
    src: null,
    txId: null,
    formSubmitted: null,
    type: null,
    addr: null,
    name: null,
    fileType: null,
  });

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
    };
    localStorageHandler(addr, payload);
  };

  useEffect(() => {
    console.log(nftState.type);
  }, [nftState.type]);

  console.log("src says:" + nftState.src);
  const onInputChange = (event) => {
    dispatch({
      type: ACTIONS.setTxId,
      payload: { txId: event.target.value },
    });

    console.log(nftState.txId);
  };

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
          <AlgoButton setAddr={setAddr} />
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
        </Flex>

        <Text>The address is {addr}</Text>
        {/* <Button onClick={() => connectToMyAlgo}> Click Me </Button> */}

        {loaded ? (
          nftState.fileType === "image/gif" ? (
            <img src={nftState.src} />
          ) : (
            <>
              <Text>{nftState.name}</Text>
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
