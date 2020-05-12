import { Translations } from '../types/translations';
import localize from './localize';
import { useLocale } from './utils';

function useLocalize(translations: Translations) {
  const lang = useLocale();
  return localize(translations, lang);
}

export default useLocalize;
