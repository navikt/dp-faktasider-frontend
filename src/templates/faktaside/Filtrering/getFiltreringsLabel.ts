const labelMap = {
  SelvstendigNaeringsdrivende: 'Selvstendig næringsdrivende',
  Laerling: 'Lærling',
  Konkurs: 'Arbeidsgiver er konkurs',
};

export function getFiltreringsvalgLabel(valg: string) {
  return labelMap[valg] || valg;
}
