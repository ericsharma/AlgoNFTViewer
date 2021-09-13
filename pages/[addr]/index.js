/** @jsxImportSource theme-ui */
import { useRouter } from "next/router";
import Link from "next/link";
import NftReducer from "../../Reducers/NftReducer";
import { useEffect, useState } from "react";

// export async function getStaticProps() {
//   console.log(allProjectsId);

//   return {
//     props: {
//       allProjectsId,
//     },
//   };
// }

const Collection = () => {
  const router = useRouter();
  const [collection, setCollection] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { addr } = router.query;

  const MapCollection = ({ collection }) => {
    return collection.map((nft) => {
      debugger;
      return (
        <>
          <img
            src={nft.src}
            sx={{ maxHeight: 500, height: "50%", width: "auto" }}
          />
          ;<li>{nft.name}</li>;
        </>
      );
    });
  };

  const retrieveLocalStorage = (addr) => {
    if (addr) {
      setCollection(JSON.parse(localStorage.getItem(addr)));
      setLoaded(true);
    }

    // const payload = JSON.parse(localStorage.getItem(addr));
  };

  useEffect(() => {
    retrieveLocalStorage(addr);
  }, [addr]);
  console.log(collection);

  // const collection = retrieveLocalStorage(addr);

  // console.log(collection);

  return (
    <>
      <h1>Post: {addr}</h1>

      {loaded && <MapCollection collection={collection} />}
    </>
  );
};

export default Collection;
