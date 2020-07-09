import amplitude from 'amplitude-js';
import { isProduction } from './environment';

const getApiKey = () => {
  if (isProduction()) {
    return 'edf391bf01b758a289ef5e7cb297f77a'; // prod
  }
  return '24eb6d83cfc9883c04c4eaec61251bf4'; // dev
};

const logging = amplitude.getInstance();
logging.init(getApiKey(), '', {
  apiEndpoint: 'amplitude.nav.no/collect',
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});

const loggEvent = (event: string, ekstraData?: object) =>
  logging.logEvent(event, {
    ...ekstraData,
    appName: 'dp-faktasider',
  });

export const loggError = (msg: string, ekstraData?: object) => loggEvent('Error', { ...ekstraData, msg });

export const loggSidevisning = (side: string, ekstraData?: object) => loggEvent('Side vist', { ...ekstraData, side });
