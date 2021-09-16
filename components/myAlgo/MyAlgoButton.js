import { Button } from "theme-ui";
import MyAlgo from "@randlabs/myalgo-connect";
import { UserContext } from "../../Context/UserProvider";
import { useContext } from "react";

export default function MyAlgoButton({ setAddr, login }) {
  const myAlgoWallet = new MyAlgo();
  const connectToMyAlgo = async () => {
    try {
      const accounts = await myAlgoWallet.connect();

      const addresses = accounts.map((account) => account.address);

      login(addresses[0]);

      setAddr(addresses[0]);

      //   console.log(addresses);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button sx={{ color: "black" }} onClick={() => connectToMyAlgo()}>
      Connect wallet
    </Button>
  );
}
