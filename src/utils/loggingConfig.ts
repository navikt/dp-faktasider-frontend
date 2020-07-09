import amplitude from 'amplitude-js';
import { isProduction } from './environment';

const getApiKey = () => {
  if (isProduction()) {
    return 'edf391bf01b758a289ef5e7cb297f77a'; // prod
  }
  return '24eb6d83cfc9883c04c4eaec61251bf4'; // dev
};

export const loggInstance = amplitude.getInstance();
loggInstance.init(getApiKey(), '', {
  apiEndpoint: 'amplitude.nav.no/collect',
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});
