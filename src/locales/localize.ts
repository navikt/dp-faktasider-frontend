import { SupportedLanguage } from './utils';

const defaultLang = 'nb';

// Kopiert fra https://www.sanity.io/docs/localization
function localize(value: any, language: SupportedLanguage) {
  const languages = [language, defaultLang];

  if (Array.isArray(value)) {
    return value.map((v) => localize(v, language));
  } else if (typeof value == 'object') {
    if (/^locale[A-Z]/.test(value._type)) {
      const language = languages.find((lang) => value[lang]);
      return language ? value[language] : 'Translation not found.';
    }

    return Object.keys(value).reduce((result, key) => {
      result[key] = localize(value[key], language);
      return result;
    }, {});
  }

  return value;
}

export default localize;
