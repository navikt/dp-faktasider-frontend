const labelMap = {
  SelvstendigNaeringsdrivende: 'Selvstendig næringsdrivende',
  Laerling: 'Lærling',
  Konkurs: 'Arbeidsgiver er konkurs',
  SagtOppSelv: 'Sier opp selv',
  MottarAnnenStotteFraNav: 'Mottar annen økonomisk støtte fra NAV',
  StreikLockout: 'Streik eller lockout',
  MottarVentelonn: 'Mottar ventelønn',
};

export function getFiltreringsvalgLabel(valg: string) {
  return labelMap[valg] || valg;
}
