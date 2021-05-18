import { createContext, ReactNode, useContext } from "react";
import { HistorikkHjelpeTekster } from "../../pages/historikk/[...slug]";

interface HistorikkContextI {
  timestamp: string | null;
  hjelpeTekster?: HistorikkHjelpeTekster;
}
const initialValue: HistorikkContextI = {
  timestamp: "",
};
const HistorikkContext = createContext<HistorikkContextI>(initialValue);

export const useHistorikkContext = () => useContext(HistorikkContext);

export default function HistorikkContextProvider(props: { children: ReactNode } & HistorikkContextI) {
  return (
    <HistorikkContext.Provider value={{ timestamp: props.timestamp, hjelpeTekster: props.hjelpeTekster }}>
      {props.children}
    </HistorikkContext.Provider>
  );
}
