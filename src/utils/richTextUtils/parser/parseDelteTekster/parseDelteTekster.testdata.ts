import { createDeltTekstBlock, createSanityBlock } from '../../../../testUtils/createSanityBlock';

const bolkUtenforDeltTekst = 'Overskrift utenfor delt tekst';
const tekstIDeltTekstFørBolk = 'Tekst fra delt tekst men før delt overskrift';
const overskriftDeltTekst = 'Delt overskrift';
const tekstEtterDeltOverskrift = 'Tekst etter delt overskrift';
const litenOverskriftEtterDeltTekst = 'Liten overskrift etter delt tekst';

const data = [
  createSanityBlock(bolkUtenforDeltTekst, 'h2'),
  createDeltTekstBlock([
    createSanityBlock(tekstIDeltTekstFørBolk, 'normal'),
    createSanityBlock(overskriftDeltTekst, 'h2'),
    createSanityBlock(tekstEtterDeltOverskrift, 'normal'),
  ]),
  createSanityBlock(litenOverskriftEtterDeltTekst, 'h3'),
];

export const parseDelteTeksterTestData = {
  tekster: {
    bolkUtenforDeltTekst,
    tekstIDeltTekstFørBolk,
    overskriftDeltTekst,
    tekstEtterDeltOverskrift,
    litenOverskriftEtterDeltTekst,
  },
  innhold: data,
};
