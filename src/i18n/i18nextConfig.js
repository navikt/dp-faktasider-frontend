import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'no',
  fallbackLng: 'no',
  resources: {
    no: {
      kalkulator: require('../locales/no/kalkulator.json'),
    },
    en: {
      kalkulator: require('../locales/en/kalkulator.json'),
    },
  },
  ns: ['kalkulator'],
  returnObjects: true,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    wait: true,
  },
  keySeparator: false,
});

i18n.languages = ['en', 'no'];

export default i18n;
