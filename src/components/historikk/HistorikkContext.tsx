import { createContext, ReactNode, useContext } from "react";
import { HistorikkHjelpeTekster } from "../../pages/historikk/[...slug]";

interface HistorikkContextI {
  requestTimestamp: string | null;
  hjelpeTekster?: HistorikkHjelpeTekster;
  isHistorikk: boolean | false;
}
const initialValue: HistorikkContextI = {
  requestTimestamp: "",
  isHistorikk: false,
};
const HistorikkContext = createContext<HistorikkContextI>(initialValue);

export const useHistorikkContext = () => useContext(HistorikkContext);

export default function HistorikkContextProvider(props: { children: ReactNode } & HistorikkContextI) {
  return (
    <HistorikkContext.Provider
      value={{
        requestTimestamp: props.requestTimestamp,
        hjelpeTekster: props.hjelpeTekster,
        isHistorikk: props.isHistorikk,
      }}
    >
      {props.children}
    </HistorikkContext.Provider>
  );
}
