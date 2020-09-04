export function useGrunnbellop() {
  const G = 99858;

  return {
    GtoNOK: (g: number) => Math.round(g * G).toLocaleString('nb-NO'),
    G: G,
  };
}
