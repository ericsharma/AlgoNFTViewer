/** @jsxImportSource theme-ui */
import Head from "next/head";
import fetch from "node-fetch";
import { useState, useEffect } from "react";
import { handleTxRequest } from "../components/TxDataRequest";
import TxDataForm from "../components/TxDataForm";
import { Box, Label, Text, Button, Heading } from "@theme-ui/components";
import NavComponent from "../components/Nav/NavComponent";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState("");
  const [txId, setTxId] = useState("");
  const [name, setName] = useState("");
  // const txId= 'SJCSJYSE3PGECAZCQFUDAUGS7OFSSGFNFPAYGUP6CIYPPK5YWONA'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [type, setType] = useState("");

  const handleSubmit = () => {
    handleTxRequest(setSrc, setLoaded, txId, setType, setName);
    setFormSubmitted();
  };

  // useEffect(() => {
  //   const myAlgoWallet = new MyAlgo();
  // }, []);

  useEffect(() => {
    console.log(type);
  }, [type]);

  console.log(type);

  console.log("src says:" + src);
  const onInputChange = (event) => {
    setTxId(event.target.value);
  };

  // const connectToMyAlgo = async () => {
  //   try {
  //     const accounts = await myAlgoWallet.connect();

  //     const addresses = accounts.map((account) => account.address);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="NFT Viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main sx={{ textAlign: "center" }}>
        <NavComponent sx={{ ml: 50 }} />
        {/* <Button onClick={() => connectToMyAlgo}> Click Me </Button> */}

        {loaded ? (
          type === "image/gif" ? (
            <img src={src} />
          ) : (
            <>
              <Text>{name}</Text>
              <video controls autoPlay name="media" crossOrigin="anonymous">
                <source src={src} type="video/mp4" />
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
