import { Button } from "theme-ui"
import MyAlgo from "@randlabs/myalgo-connect"

export default function MyAlgoButton({ login }) {
  const myAlgoWallet = new MyAlgo()
  const connectToMyAlgo = async () => {
    try {
      const accounts = await myAlgoWallet.connect()

      const addresses = accounts.map((account) => account.address)

      login(addresses[0]) //Note: Is it worth getting the wallet adress from the button and setting the login in a dif component?
      // setUser(addresses[0])
    } catch (err) {
      console.error(err)
    }
  }

  return <Button onClick={() => connectToMyAlgo()}>Connect wallet</Button>
}
