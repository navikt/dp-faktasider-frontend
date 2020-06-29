import React, { useContext } from 'react';
import { createContext, ReactNode } from 'react';
import { TranslatedFaktaSideData } from './FaktaSide';
import { ParsedRichText } from '../../utils/richTextUtils/parser/parseRichText';

interface FaktaSideContextI {
  data?: TranslatedFaktaSideData;
  parsedRichText?: ParsedRichText;
  id?: string;
}

export const FaktasideContext = createContext<FaktaSideContextI>({ data: undefined, parsedRichText: undefined });

export const useFaktasideContext = () => useContext(FaktasideContext);

export const FaktasideProvider = (props: { children: ReactNode } & FaktaSideContextI) => {
  const { children, ...rest } = props;
  return <FaktasideContext.Provider value={rest}>{children}</FaktasideContext.Provider>;
};
