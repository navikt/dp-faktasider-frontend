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
