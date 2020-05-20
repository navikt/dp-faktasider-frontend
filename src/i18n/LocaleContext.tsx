import React, { createContext, ReactNode, useContext } from 'react';
import { SupportedLanguage } from './supportedLanguages';

export const LocaleContext = createContext('no');

export const LocaleProvider = (props: { children: ReactNode; lang: SupportedLanguage }) => {
  return <LocaleContext.Provider value={props.lang}>{props.children}</LocaleContext.Provider>;
};

export const useLocale = () => useContext(LocaleContext);
