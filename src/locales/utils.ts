import { useContext } from 'react';
import { LocaleContext } from './LocaleContext';

export type SupportedLanguage = 'en' | 'nn' | 'nb';

export const useLocale = () => {
  return useContext(LocaleContext).lang;
};
