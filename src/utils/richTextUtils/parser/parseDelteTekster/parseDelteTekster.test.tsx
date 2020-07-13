import React from 'react';
import { createDeltTekstBlock, createSanityBlock } from '../../../../testUtils/createSanityBlock';
import parseRichText from '../parseRichText';
import { render, within } from '../../../../testUtils/customized-testing-library';
import BlockContent from '../../../../components/BlockContent/BlockContent';

const testData = [
  createSanityBlock('Overskrift utenfor delt tekst', 'h2'),
  createDeltTekstBlock([
    createSanityBlock('Tekst fra delt tekst men før delt overskrift', 'normal'),
    createSanityBlock('Delt overskrift', 'h2'),
    createSanityBlock('Tekst etter delt overskrift', 'normal'),
  ]),
  createSanityBlock('Liten overskrift etter delt tekst', 'h3'),
];

test('innhold fra delt-tekst blir integrert sømløst i resten av innholdet', () => {
  const parsedBlocks = parseRichText(testData);

  const result = render(<BlockContent blocks={parsedBlocks} />);

  const overskriftFørDeltTekst = result.getByLabelText('Overskrift utenfor delt tekst');
  within(overskriftFørDeltTekst).getByText('Tekst fra delt tekst men før delt overskrift');

  const overskriftFraDeltTekst = result.getByLabelText('Delt overskrift');
  within(overskriftFraDeltTekst).getByText('Tekst etter delt overskrift');
  within(overskriftFraDeltTekst).getByLabelText('Liten overskrift etter delt tekst');
});
