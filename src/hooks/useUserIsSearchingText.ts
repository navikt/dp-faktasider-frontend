import useKeyboardJs from "react-use/lib/useKeyboardJs";
import { useEffect } from "react";
import { loggSøkITekst } from "../utils/logging";

function useUserIsSearchingText() {
  const [userIsSearchingText] = useKeyboardJs(["ctrl + f", "command + f"]); // Denne gir warning i test (Warning: An update to Tilleggsinnformasjon inside a test was not wrapped in act(...))

  useEffect(() => {
    userIsSearchingText && loggSøkITekst();
  }, [userIsSearchingText]);

  return userIsSearchingText;
}

export default useUserIsSearchingText;
