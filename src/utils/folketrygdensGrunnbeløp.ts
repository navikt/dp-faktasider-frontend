// Folketrygdens grunnbelløp
export const G = 99858;

export function GtoNOK(g: number) {
  return Math.round(g * G).toLocaleString('nb-NO');
}
