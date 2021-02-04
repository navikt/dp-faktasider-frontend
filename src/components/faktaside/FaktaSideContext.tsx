import React, { createContext, ReactNode, useContext } from "react";
import { FaktasideProps } from "./Faktaside";

const defaultValue: FaktasideProps = {
  id: "N/A",
  slug: "N/A",
  rawData: {
    faktaside: {
      id: "N/A",
      _updatedAt: "N/A",
      slug: "N/A",
    },
    oppsett: {},
  },
  menuData: [],
};

const Context = createContext<FaktasideProps>(defaultValue);

export const useFaktasideContext = () => useContext(Context);

export const FaktasideProvider = (props: { children: ReactNode; faktasideProps: FaktasideProps }) => {
  return <Context.Provider value={props.faktasideProps}>{props.children}</Context.Provider>;
};
