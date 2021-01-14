import { useEffect, useState } from "react";
import { guid } from "nav-frontend-js-utils";
import { idFromString } from "./idFromString";


function generateId(label: string) {
  return `${idFromString(label)}-${guid().substr(0, 5)}`;
}

function useUniqueId(label: string) {
  const [id, setId] = useState(label);

  useEffect(() => setId(generateId(label)), [label]);

  return id;
}

export default useUniqueId;
