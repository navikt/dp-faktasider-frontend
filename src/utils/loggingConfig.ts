import amplitude from "amplitude-js";

const getApiKey = () => {
  if (window.location.href.includes("www.nav.no")) {
    return "b0bccdd4dd75081606ef7bcab668a7ed"; // prod
  }
  return "2f190e67f31d7e4719c5ff048ad3d3e6"; // dev
};

export const loggInstance = amplitude.getInstance();
loggInstance.init(getApiKey(), "", {
  apiEndpoint: "amplitude.nav.no/collect",
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});

const getApiKeyDeprecated = () => {
  if (window.location.href.includes("www.nav.no")) {
    return "edf391bf01b758a289ef5e7cb297f77a"; // prod
  }
  return "24eb6d83cfc9883c04c4eaec61251bf4"; // dev
};

// Skal flytte over logging til samme prosjekt som team PAW bruker, men logger dobbelt en periode for smooth overgang. https://github.com/navikt/dagpenger/issues/768
// Kan slettes etter 1. juni 2021
export const loggInstanceDeprecated = amplitude.getInstance("deprecated");
loggInstanceDeprecated.init(getApiKeyDeprecated(), "", {
  apiEndpoint: "amplitude.nav.no/collect",
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});
