/*
Vi må lazy-loade loggingConfig, da nextjs rendrer html på server, og kresjer dermed amplitude-sdk
Prøver derfor å ikke initiere amplitude-sdk instansen før en logevent blir kalt.
*/

import { isProduction } from "./environment";
import { mediaBreakpoint } from "../styles/theme";

const loggEvent = (event: string, ekstraData?: object) => {
  if (!isProduction()) {
    return;
  }

  import("../utils/loggingConfig").then((logging) =>
    logging.loggInstance.logEvent(event, {
      ...ekstraData,
      appName: "dp-faktasider",
      smallScreen: window.innerWidth < mediaBreakpoint,
    })
  );
};

export const loggError = (error: Error, ekstraData?: object) => {
  const data = {
    ...ekstraData,
    siteUrl: window.location.pathname,
    msg: error.message,
    name: error.name,
    stack: error.stack,
  };

  console.error(data);

  return loggEvent("Error", data);
};

export const loggRedirect = (fraLenke: string) => loggEvent("Redirect fra gammel lenke", { fraLenke });

export const loggSidevisning = (side: string) => {
  loggEvent("Side vist", { side });
  setTimeout(() => loggEvent("Ble mer enn 3 sekunder", { side }), 3000);
};

export const loggIkkeOversatt = (side: string) => loggEvent("Ikke oversatt", { side });

export const loggKalkulatorbruk = (type: string) => loggEvent("Brukt kalkulator", { type });

export const loggHashlenkeKlikk = () => loggEvent("Brukt hashlenke");

export const loggMeny = (type: string) => loggEvent("Meny", { type });

export const loggH2MenyKlikk = () => loggEvent("H2Meny", { type: "Hopp til underoverskrift" });

export const loggVisTilleggsinfo = (tittel: string) => loggEvent("Vis tilleggsinfo", { tittel });

export const loggTilpassInnhold = (situasjon: string) => loggEvent("Tilpasset innhold", { situasjon });

export const loggNotFound = (path: string) => loggEvent("404 - not found", { path });

export const loggHashNotFound = (hash: string, path: string) => loggEvent("Hashlenke finnes ikke", { path, hash });

export const loggSøkITekst = () => loggEvent("Søk i tekst");
