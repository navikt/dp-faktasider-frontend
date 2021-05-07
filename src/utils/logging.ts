/*
Vi må lazy-loade loggingConfig, da nextjs rendrer html på server, og kresjer dermed amplitude-sdk
Prøver derfor å ikke initiere amplitude-sdk instansen før en logevent blir kalt.
*/

import { isTest } from "./environment";
import { mediaBreakpoint } from "../styles/theme";

const loggEvent = (event: string, ekstraData?: object) => {
  if (isTest()) {
    return;
  }

  try {
    import("../utils/loggingConfig").then((logging) => {
      const smallScreen = window.innerWidth < mediaBreakpoint;
      const data = {
        appName: "dp-faktasider",
        smallScreen, // TODO fjern denne når det har gått litt tid, feks etter mai 2021. erstattes av 'screenSize'
        screenSize: smallScreen ? "small" : "large",
        path: window.location.pathname,
        ...ekstraData,
      };

      logging.loggInstance.logEvent(event, data);
      logging.loggInstanceDeprecated.logEvent(event, data);
    });
  } catch (e) {
    console.error("Kunne ikke logge til amplitdue:", e);
  }
};

export const loggError = (error: Error, ekstraData?: object) => {
  const data = {
    ...ekstraData,
    msg: error.message,
    name: error.name,
    stack: error.stack,
  };

  console.error(data);

  return loggEvent("Error", data);
};

export const loggSidevisning = (side: string) => {
  loggEvent("Side vist", { side });
  setTimeout(() => loggEvent("Ble mer enn 3 sekunder", { side }), 3000);
};

export const loggIkkeOversatt = (side: string) => loggEvent("Ikke oversatt", { side });

export const loggKalkulatorbruk = (type: string) => loggEvent("Brukt kalkulator", { type });

export const loggMeny = (type: string) => loggEvent("Meny", { type });

export const loggH2MenyKlikk = () => loggEvent("H2Meny", { type: "Hopp til underoverskrift" });

export const loggVisTilleggsinfo = (tittel: string) => loggEvent("Vis tilleggsinfo", { tittel });

export const loggTilpassInnhold = (situasjon: string) => loggEvent("Tilpasset innhold", { situasjon });

export const loggNotFound = (path: string) => loggEvent("404 - not found", { path });

export const loggHashNotFound = (hash: string, path: string) => loggEvent("Hashlenke finnes ikke", { path, hash });
