import React from 'react';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../utils/richTextUtils/parser/parseRichText';
import BlockContent from './BlockContent';
import { render } from '../../testUtils/customized-testing-library';
import { crateSanityListeElement } from '../../testUtils/createSanityBlock';

const data = [
  crateSanityListeElement('Utkast i bulletpointliste', ['utkast']),
  crateSanityListeElement('Litt tekst'),
] as SanityBlock[];

describe('utkast', () => {
  const parsedInnhold = parseRichText(data);
  test('dersom hele teksten i et bulletpoint er merket som utkast skal bulletpointet ikke vises', () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);

    const listepunkter = result.getAllByRole('listitem');
    expect(listepunkter).toHaveLength(1);
  });
});
