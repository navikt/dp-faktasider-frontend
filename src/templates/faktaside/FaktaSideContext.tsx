import React, { createContext, ReactNode, useContext } from 'react';
import { FaktasideContext } from '../../../gatsby-utils/createFaktasider';

const inital: FaktasideContext = {
  lang: 'no',
  id: 'N/A',
  slug: 'N/A',
  publiseringsTidspunkt: '',
  innhold: [],
  rawData: {},
};

const Context = createContext<FaktasideContext>(inital);

export const useFaktasideContext = () => useContext(Context);

export const FaktasideProvider = (props: { children: ReactNode } & FaktasideContext) => {
  const { children, ...rest } = props;
  return <Context.Provider value={rest}>{children}</Context.Provider>;
};
