import { useEffect, useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Error } from "../../views/error/Error";
// import ErrorBoundary from "../../components/ErrorBoundary";

const dumData = {
  yolo: "swag",
};

export default function Test() {
  const [counter, setCounter] = useState(0);
  function handleOnClick() {
    console.log(counter);
    setCounter(counter + 1);
    // @ts-ignore
    const yolo = dumData.swag;
    console.log(yolo);
    // @ts-ignore
    throw new Error("BOMB");
  }

  useEffect(() => {
    if (counter > 1) {
      // @ts-ignore
      const lol = dumData.dust.data;
    }
  }, [counter]);

  return (
    <>
      <Error />

      {/*<div>fisketryne path</div>*/}
      {/*<button onClick={handleOnClick}>Sprengbart</button>*/}
    </>
  );
}
