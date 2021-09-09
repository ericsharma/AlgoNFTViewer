import { Button } from "theme-ui";
import MyAlgo from "@randlabs/myalgo-connect";

export default function MyAlgoButton({ setAddr }) {
  const myAlgoWallet = new MyAlgo();
  const connectToMyAlgo = async () => {
    try {
      console.log("hit");
      const accounts = await myAlgoWallet.connect();

      const addresses = accounts.map((account) => account.address);
      setAddr(addresses[0]);
      //   console.log(addresses);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button sx={{ color: "black" }} onClick={() => connectToMyAlgo()}>
      CLICK ME
    </Button>
  );
}
