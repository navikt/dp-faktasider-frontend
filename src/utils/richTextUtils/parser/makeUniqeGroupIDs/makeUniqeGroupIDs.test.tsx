import { render, within } from '../../../../testUtils/customized-testing-library';
import parseRichText from '../parseRichText';
import BlockContent from '../../../../components/BlockContent/BlockContent';
import React from 'react';
import { PureInnholdsfortegnelse } from '../../../../templates/faktaside/InnholdsMeny/Innholdsfortegnelse';
import { Group, isH2Group } from '../../richTextTypes';
import { createSanityBlock } from '../../../../testUtils/createSanityBlock';

const duplikatOverskrift = 'Duplikat overskrift';

const data = [
  createSanityBlock('Unik overskrift', 'h2'),
  createSanityBlock(duplikatOverskrift, 'h3'),
  createSanityBlock('Innhold 1', 'normal'),
  createSanityBlock(duplikatOverskrift, 'h2'),
  createSanityBlock('Innhold 2', 'normal'),
];

test('makeUniqueGroupIDs lager unike IDer slik at vi kan lage fungerende hash-lenker i appen', () => {
  const parsedBlocks = parseRichText(data);
  const h2Groups: Group[] = parsedBlocks.filter(isH2Group);

  const result = render(
    <>
      <PureInnholdsfortegnelse title="Tester unike ID'er" innholdsListe={h2Groups} />
      <BlockContent blocks={parsedBlocks} />
    </>
  );

  const innholdsFortegnelse = result.getByLabelText(/Innholdsfortegnelse/i);
  const hashLenke = within(innholdsFortegnelse).getByText(duplikatOverskrift) as HTMLAnchorElement;
  const hashId = hashLenke.href.split('#')[1];

  const target = result.getAllByTestId(hashId);
  expect(target[0].innerHTML.includes('Innhold 2')).toBe(true);
  expect(target).toHaveLength(1);
});
