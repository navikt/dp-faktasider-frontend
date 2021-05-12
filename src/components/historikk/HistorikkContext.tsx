import { createContext, ReactNode, useContext } from "react";
import { HistorikkTekster } from "../../pages/historikk/[...slug]";

interface HistorikkContextI {
  timestamp: string | null;
  tekster?: HistorikkTekster;
}
const initialValue: HistorikkContextI = {
  timestamp: "",
};
const HistorikkContext = createContext<HistorikkContextI>(initialValue);

export const useHistorikkContext = () => useContext(HistorikkContext);

export default function HistorikkContextProvider(props: { children: ReactNode } & HistorikkContextI) {
  return <HistorikkContext.Provider value={{ timestamp: props.timestamp, tekster: props.tekster }}>{props.children}</HistorikkContext.Provider>;
}
