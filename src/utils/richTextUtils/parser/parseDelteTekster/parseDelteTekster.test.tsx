import React from 'react';
import parseRichText from '../parseRichText';
import { render, within } from '../../../../testUtils/customized-testing-library';
import BlockContent from '../../../../components/BlockContent/BlockContent';
import { parseDelteTeksterTestData } from './parseDelteTekster.testdata';

test('innhold fra delt-tekst blir integrert sømløst i resten av innholdet', () => {
  const parsedBlocks = parseRichText(parseDelteTeksterTestData);

  const result = render(<BlockContent blocks={parsedBlocks} />);

  const overskriftFørDeltTekst = result.getByLabelText('Overskrift utenfor delt tekst');
  within(overskriftFørDeltTekst).getByText('Tekst fra delt tekst men før delt overskrift');

  const overskriftFraDeltTekst = result.getByLabelText('Delt overskrift');
  within(overskriftFraDeltTekst).getByText('Tekst etter delt overskrift');
  within(overskriftFraDeltTekst).getByLabelText('Liten overskrift etter delt tekst');
});
