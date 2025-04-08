import { useEffect, useRef, useState } from "react";
import { idFromString } from "./idFromString";
import { v4 as uuidv4 } from "uuid";

function useUniqueId(label: string) {
  const [uniqueId, setUniqueId] = useState("");
  const id = useRef(`${idFromString(label)}-${uuidv4().substr(0, 5)}`).current;

  useEffect(() => {
    setUniqueId(id);
  }, []);

  return uniqueId;
}

export default useUniqueId;
