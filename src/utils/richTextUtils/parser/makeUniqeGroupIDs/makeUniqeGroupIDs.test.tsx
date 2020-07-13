import { render, within } from '../../../test-utils';
import parseRichText from '../parseRichText';
import { makeUniqeGroupIDsMockData } from './makeUniqeGroupIDsMockData';
import BlockContent from '../../../../components/BlockContent/BlockContent';
import React from 'react';
import { PureInnholdsfortegnelse } from '../../../../templates/faktaside/InnholdsMeny/Innholdsfortegnelse';
import { Group, isH2Group } from '../../richTextTypes';

test('makeUniqueGroupIDs lager unike IDer slik at vi kan lage fungerende hash-lenker i appen', () => {
  const parsedBlocks = parseRichText(makeUniqeGroupIDsMockData);
  const h2Groups: Group[] = parsedBlocks.filter(isH2Group);

  const result = render(
    <>
      <PureInnholdsfortegnelse title="Tester unike ID'er" innholdsListe={h2Groups} />
      <BlockContent blocks={parsedBlocks} />
    </>
  );

  const innholdsFortegnelse = result.getByLabelText(/Innholdsfortegnelse/i);
  const hashLenke = within(innholdsFortegnelse).getByText(/Duplikat overskrift/i) as HTMLAnchorElement;
  const hashId = hashLenke.href.split('#')[1];

  const target = result.getAllByTestId(hashId);
  expect(target[0].innerHTML.includes('Innhold 2')).toBe(true);
  expect(target).toHaveLength(1);
});
