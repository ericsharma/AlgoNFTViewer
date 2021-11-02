import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import Header from "../../../components/Header/Header"
import { StyledNftImage } from "../../../components/Display/styles"
import Donations from "../../../components/Header/Donations"
import { AlertContext } from "../../../components/Alert/AlertProvider"
import { Fade } from "../../../components/Display/styles"

const Nft = () => {
  const router = useRouter()
  const { nft } = router.query

  const [targetNft, setTargetNft] = useState(null)
  const [loaded, setLoaded] = useState(false)
  console.log(nft)

  const {
    setAlertMessage,
    alertMessage,
    setError,
    executeAlertTransition,
    triggerTransition,
    error,
  } = useContext(AlertContext)

  const retrieveLocalStorage = (nft) => {
    if (nft) {
      //This is to stop setting of collection when params haven't coneback from Router object
      const addr = sessionStorage.getItem("user")

      const collection = JSON.parse(localStorage.getItem(addr))
      const target = collection.filter((item) => item.assetId === Number(nft))
      console.log(target)
      setTargetNft(target[0])

      setLoaded(true)
    }
  }
  useEffect(() => {
    retrieveLocalStorage(nft)
    console.log(sessionStorage.getItem("user") + " from the nftPage")
  }, [nft])
  return (
    <>
      <Header />
      <Fade in={triggerTransition} message={alertMessage} error={error} />
      {loaded && <StyledNftImage nftState={targetNft} />}
      <Donations
        setAlertMessage={setAlertMessage}
        executeAlertTransistion={executeAlertTransition}
      />
    </>
  )
}

export default Nft
