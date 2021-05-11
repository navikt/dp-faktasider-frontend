import { createContext, ReactNode, useContext } from "react";

interface HistorikkContextI {
  timestamp: string | null;
}
const initialValue: HistorikkContextI = {
  timestamp: "",
};
const HistorikkContext = createContext<HistorikkContextI>(initialValue);

export const useHistorikkContext = () => useContext(HistorikkContext);

export default function HistorikkContextProvider(props: { children: ReactNode } & HistorikkContextI) {
  return <HistorikkContext.Provider value={{ timestamp: props.timestamp }}>{props.children}</HistorikkContext.Provider>;
}
