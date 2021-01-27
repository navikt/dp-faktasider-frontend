import React, { createContext, ReactNode, useContext } from "react";
import { FaktasideParsedData } from "./types";

const defaultValue: FaktasideParsedData = {
  faktaside: {},
  oppsett: {},
  menuData: [],
  rawData: {
    faktaside: {},
    oppsett: {},
  },
};

const Context = createContext<FaktasideParsedData>(defaultValue);

export const useFaktasideContext = () => useContext(Context);

export const FaktasideProvider = (props: { children: ReactNode; faktasideData: FaktasideParsedData }) => {
  return <Context.Provider value={props.faktasideData}>{props.children}</Context.Provider>;
};
