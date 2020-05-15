import React, { createContext, ReactNode, useContext } from 'react';
import { FaktaSideProps } from './FaktaSide';

export const FaktaSideContext = createContext<FaktaSideProps>(({} as unknown) as FaktaSideProps);

export const useFaktasideProps = () => useContext(FaktaSideContext);

export const FaktasideProvider = (props: { children: ReactNode; faktasideProps: FaktaSideProps }) => {
  return <FaktaSideContext.Provider value={props.faktasideProps}>{props.children}</FaktaSideContext.Provider>;
};
