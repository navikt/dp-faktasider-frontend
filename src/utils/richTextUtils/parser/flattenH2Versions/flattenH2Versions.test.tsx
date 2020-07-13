import React from 'react';
import { render, within } from '../../../../testUtils/customized-testing-library';
import BlockContent from '../../../../components/BlockContent/BlockContent';
import parseRichText from '../parseRichText';
import { createSanityBlock } from '../../../../testUtils/createSanityBlock';

const testData = [
  createSanityBlock('Vanlig overskrift', 'h2'),
  createSanityBlock('Overskrift uten bakgrunn', 'h2-no-background'),
  createSanityBlock('Overskrift med meny', 'h2-m-meny'),
  createSanityBlock('Menypunkt', 'h3'),
];

describe('flattenH2Versions', () => {
  const parsedBlocks = parseRichText(testData);

  test('alle h2-versjoner blir til grupper', () => {
    const result = render(<BlockContent blocks={parsedBlocks} />);
    const bolker = result.container.querySelectorAll(`h2`);
    expect(bolker).toHaveLength(3);
  });

  test('h2 med meny får en meny med innhold', () => {
    const result = render(<BlockContent blocks={parsedBlocks} />);

    const bolkMedMeny = result.getByLabelText('Overskrift med meny');
    const bolkMeny = within(bolkMedMeny).getByLabelText('Innhold Overskrift med meny');
    const menyPunkt = within(bolkMeny).getByText('Menypunkt') as HTMLAnchorElement;

    expect(menyPunkt.href).toBeTruthy();
  });
});
