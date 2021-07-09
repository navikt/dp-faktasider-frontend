import { createContext, ReactNode, useContext } from "react";
import { HistorikkHjelpeTekster } from "../../pages/historikk/[...slug]";

interface HistorikkContextI {
  requestTimestamp: string | null;
  loggingInfo: {
    timestamp: string;
    nåværendeTittel: string;
  };
  hjelpeTekster?: HistorikkHjelpeTekster;
  isHistorikk: boolean | false;
}
const initialValue: HistorikkContextI = {
  requestTimestamp: "",
  isHistorikk: false,
  loggingInfo: {
    nåværendeTittel: "",
    timestamp: "",
  },
};
const HistorikkContext = createContext<HistorikkContextI>(initialValue);

export const useHistorikkContext = () => useContext(HistorikkContext);

export default function HistorikkContextProvider(props: { children: ReactNode } & HistorikkContextI) {
  return <HistorikkContext.Provider value={props}>{props.children}</HistorikkContext.Provider>;
}
