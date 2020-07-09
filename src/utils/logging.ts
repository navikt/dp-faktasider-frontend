/*
Vi må lazy-loade loggingConfig, da gatsby pre-rendrer html, og kresjer dermed amplitude-sdk
Prøver derfor å ikke initiere amplitude-sdk instansen før en logevent blir kalt.
*/

const loggEvent = (event: string, ekstraData?: object) =>
  import('../utils/loggingConfig').then((logging) =>
    logging.loggInstance.logEvent(event, {
      ...ekstraData,
      appName: 'dp-faktasider',
    })
  );

export const loggError = (msg: string, ekstraData?: object) => loggEvent('Error', { ...ekstraData, msg });

export const loggRedirect = (fraLenke: string) => loggEvent('Redirect fra gammel lenke', { fraLenke });

export const loggSidevisning = (side: string) => loggEvent('Side vist', { side });

export const loggKalkulatorbruk = (type: string) => loggEvent('Brukt kalkulator', { type });
