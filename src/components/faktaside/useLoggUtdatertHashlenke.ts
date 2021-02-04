import { useLocation, useMount } from "react-use";
import { loggHashNotFound } from "../../utils/logging";

function useLoggUtdatertHashlenke() {
  const location = useLocation();

  useMount(() => {
    const path = location.pathname || "N/A";
    const hash = location.hash;

    if (hash) {
      const iDExistsInDocument = document.getElementById(hash.replace("#", ""));
      if (!iDExistsInDocument) {
        loggHashNotFound(hash, path);
      }
    }
  });
}

export default useLoggUtdatertHashlenke;
