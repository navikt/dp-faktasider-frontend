import { useFaktasideContext } from "../components/faktaside/FaktaSideContext";

export function useGrunnbellop() {
  const G = useFaktasideContext().folketrygdensGrunnbellop || NaN;

  return {
    GtoNOK: (g: number) => Math.round(g * G).toLocaleString("nb-NO"),
    G: G,
  };
}
