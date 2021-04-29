import amplitude from "amplitude-js";

const getApiKey = () => {
  if (window.location.href.includes("www.nav.no")) {
    return "edf391bf01b758a289ef5e7cb297f77a"; // prod
  }
  return "24eb6d83cfc9883c04c4eaec61251bf4"; // dev
};

// Skal flytte over logging til samme prosjekt som team PAW bruker, men logger dobbelt en periode for smooth overgang. https://github.com/navikt/dagpenger/issues/768
export const loggInstanceDeprecated = amplitude.getInstance();
loggInstanceDeprecated.init(getApiKey(), "", {
  apiEndpoint: "amplitude.nav.no/collect",
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});
