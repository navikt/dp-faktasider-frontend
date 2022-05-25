import amplitude from "amplitude-js";

const getApiKey = () => {
  if (window.location.href.includes("www.nav.no")) {
    return "913768927b84cde5eac0d0d18c737561"; // prod
  }
  return "9845ded64c69cd068651cd0d968e0796"; // dev
};

export const loggInstance = amplitude.getInstance();
loggInstance.init(getApiKey(), "", {
  apiEndpoint: "amplitude.nav.no/collect",
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});
