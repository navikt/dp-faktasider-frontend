import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { format as datefnsFormat } from 'date-fns';
import { enGB, nb } from 'date-fns/locale';

i18n.use(initReactI18next).init({
  lng: 'no',
  fallbackLng: 'no',
  resources: {
    no: {
      kalkulator: require('../locales/no/kalkulator.json'),
      global: require('../locales/no/global.json'),
    },
    en: {
      kalkulator: require('../locales/en/kalkulator.json'),
      global: require('../locales/en/global.json'),
    },
  },
  ns: ['kalkulator', 'global'],
  defaultNS: 'global',
  returnObjects: true,
  interpolation: {
    format: function (value, format, lng) {
      const locale = lng === 'no' ? nb : enGB;
      if (value instanceof Date) return datefnsFormat(value, format, { locale });
      return value;
    },
    escapeValue: false, //not needed for react!!
  },
  react: {
    wait: true,
  },
  keySeparator: false,
});

i18n.languages = ['en', 'no'];

export default i18n;
