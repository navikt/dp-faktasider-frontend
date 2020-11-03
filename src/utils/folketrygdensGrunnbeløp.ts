import useProjectData from "../hooks/graphQl/useProjectData";

export function useGrunnbellop() {
  const G = useProjectData().folketrygdensGrunnbellop;

  return {
    GtoNOK: (g: number) => Math.round(g * G).toLocaleString("nb-NO"),
    G: G,
  };
}
