import { useEffect, useRef, useState } from "react";
import { guid } from "nav-frontend-js-utils";
import { idFromString } from "./idFromString";

function useUniqueId(label: string) {
  const [uniqueId, setUniqueId] = useState("");
  const id = useRef(`${idFromString(label)}-${guid().substr(0, 5)}`).current;

  useEffect(() => {
    setUniqueId(id);
  }, []);

  return uniqueId;
}

export default useUniqueId;
