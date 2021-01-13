import React, { createContext, ReactNode, useContext } from "react";
import { FaktaSideProps } from "./types";

const inital: FaktaSideProps = {
  menuData: [],
  path: "",
  lang: "no",
  id: "N/A",
  slug: "N/A",
  publiseringsTidspunkt: "",
  innhold: [],
  rawData: {},
  notifikasjoner: []
};

const Context = createContext<FaktaSideProps>(inital);

export const useFaktasideContext = () => useContext(Context);

export const FaktasideProvider = (props: { children: ReactNode } & FaktaSideProps) => {
  const { children, ...rest } = props;
  return <Context.Provider value={rest}>{children}</Context.Provider>;
};
