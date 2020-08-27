const labelMap = {
  SelvstendigNaeringsdrivende: 'Selvstendig næringsdrivende',
};

export function getFiltreringsvalgLabel(valg: string) {
  return labelMap[valg] || valg;
}
