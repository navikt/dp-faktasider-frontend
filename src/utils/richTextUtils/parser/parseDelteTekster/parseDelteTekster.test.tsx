import React from 'react';
import parseRichText from '../parseRichText';
import { render, within } from '../../../../testUtils/customized-testing-library';
import BlockContent from '../../../../components/BlockContent/BlockContent';
import { parseDelteTeksterTestData } from './parseDelteTekster.testdata';

const { innhold } = parseDelteTeksterTestData;
const {
  bolkUtenforDeltTekst,
  litenOverskriftEtterDeltTekst,
  overskriftDeltTekst,
  tekstEtterDeltOverskrift,
  tekstIDeltTekstFørBolk,
} = parseDelteTeksterTestData.tekster;

test('innhold fra delt-tekst blir integrert sømløst i resten av innholdet', () => {
  const parsedBlocks = parseRichText(innhold);

  const result = render(<BlockContent blocks={parsedBlocks} />);

  const overskriftFørDeltTekst = result.getByLabelText(bolkUtenforDeltTekst);
  within(overskriftFørDeltTekst).getByText(tekstIDeltTekstFørBolk);

  const overskriftFraDeltTekst = result.getByLabelText(overskriftDeltTekst);
  within(overskriftFraDeltTekst).getByText(tekstEtterDeltOverskrift);
  within(overskriftFraDeltTekst).getByLabelText(litenOverskriftEtterDeltTekst);
});
