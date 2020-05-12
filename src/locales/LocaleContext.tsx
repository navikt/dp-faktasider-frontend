import React, { createContext, ReactNode, useState } from 'react';
import { SupportedLanguage } from './utils';

type LocaleContextI = {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
};

export const LocaleContext = createContext<LocaleContextI>({ lang: 'nb', setLang: () => undefined });

export const LocaleProvider = (props: { children: ReactNode; defaultLang: SupportedLanguage }) => {
  const [lang, setLang] = useState(props.defaultLang);

  return <LocaleContext.Provider value={{ lang, setLang }}>{props.children}</LocaleContext.Provider>;
};
