import { Button } from "theme-ui";
import MyAlgo from "@randlabs/myalgo-connect";

export default function MyAlgoButton() {
  const myAlgoWallet = new MyAlgo();
  const connectToMyAlgo = async () => {
    try {
      console.log("hit");
      const accounts = await myAlgoWallet.connect();

      const addresses = accounts.map((account) => account.address);
      console.log(addresses);
      debugger;
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onClick={() => connectToMyAlgo()}> CLICK ME </Button>;
}
