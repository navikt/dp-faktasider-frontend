import React, { createContext, ReactNode, useContext } from "react";
import { FaktasideParsedData, parseFaktasideData } from "../../sanity/groq/faktaside/parseFaktasideData";
import { MenuItem, parseMenuData } from "../../sanity/groq/menu/parseMenuData";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import { FaktasideRawData } from "./Faktaside";

const defaultValue: FaktasideContext = {
  id: "N/A",
  slug: "N/A",
  tilpassInnholdValg: [],
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

const Context = createContext<FaktasideContext>(defaultValue);

export const useFaktasideContext = () => useContext(Context);

export interface FaktasideContext extends FaktasideParsedData {
  menuData: MenuItem[];
}

export const FaktasideProvider = (props: { children: ReactNode; faktasideContext: FaktasideContext }) => {
  return <Context.Provider value={props.faktasideContext}>{props.children}</Context.Provider>;
};

export function createFaktasideContext(props: FaktasideRawData, locale: SupportedLanguage): FaktasideContext {
  return {
    ...parseFaktasideData(props.rawFaktasideData, locale),
    menuData: parseMenuData(props.rawMenuData, locale),
  };
}
