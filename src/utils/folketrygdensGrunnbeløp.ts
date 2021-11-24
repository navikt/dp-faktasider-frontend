import { useFaktasideContext } from "../views/faktaside/FaktaSideContext";

export function useGrunnbellop() {
  const G = useFaktasideContext().folketrygdensGrunnbellop || NaN;

  return {
    GtoNOK: (g: number) => Math.round(g * G).toLocaleString("no-NO"),
    G: G,
  };
}
