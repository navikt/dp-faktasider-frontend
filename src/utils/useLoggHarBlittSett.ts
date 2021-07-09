import { useEffect, useRef } from "react";
import { pxFromTop } from "./domUtils";
import { loggHarSett } from "./logging";

function isInViewport(id: string) {
  return pxFromTop(id) > 0 && pxFromTop(id) < window.innerHeight - 150;
}

export function useLoggHarBlittSett(id: string, tittel: string) {
  const logged = useRef(false);

  const handler = () => {
    if (!logged.current && isInViewport(id)) {
      setTimeout(() => {
        // timeout så det ikke blir logget hvis bruker bare blar kjapt forbi
        if (!logged.current && isInViewport(id)) {
          logged.current = true;
          loggHarSett(tittel);
        }
      }, 1500);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handler);
    return () => document.removeEventListener("scroll", handler);
  }, []);
}
