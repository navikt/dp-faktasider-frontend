import fetchProjectData from "../hooks/graphQl/fetchProjectData";

export function useGrunnbellop() {
  const G = fetchProjectData().folketrygdensGrunnbellop;

  return {
    GtoNOK: (g: number) => Math.round(g * G).toLocaleString("nb-NO"),
    G: G,
  };
}
