import React from 'react';
import { render, within } from '../../../../testUtils/customized-testing-library';
import BlockContent from '../../../../components/BlockContent/BlockContent';
import { groupParser } from './groupParser';
import { createSanityBlock } from '../../../../testUtils/createSanityBlock';

const data = [
  createSanityBlock('Overskrift 1', 'h2'),
  createSanityBlock('Innhold 1', 'normal'),
  createSanityBlock('Overskrift 2', 'h2'),
  createSanityBlock('Innhold 2', 'normal'),
  createSanityBlock('Overskrift 2.1', 'h3'),
  createSanityBlock('Innhold 2.1', 'normal'),
  createSanityBlock('Overskrift 2.1.1', 'h4'),
  createSanityBlock('Innhold 2.1.1', 'normal'),
  createSanityBlock('Overskrift 2.2', 'h3'),
  createSanityBlock('Innhold 2.2', 'normal'),
];

test('groupParser grupperer innhold etter overskrift som forventet', () => {
  const parsedBlocks = groupParser(data);

  const { getByLabelText } = render(<BlockContent blocks={parsedBlocks} />);

  const bolk1 = getByLabelText('Overskrift 1');
  within(bolk1).getByText('Innhold 1');
  expect(within(bolk1).queryByText('Innhold 2')).toBeFalsy();

  const bolk2 = getByLabelText('Overskrift 2');
  within(bolk2).getByText('Innhold 2');
  within(bolk2).getByText('Overskrift 2.1');
  within(bolk2).getByText('Overskrift 2.1.1');
  within(bolk2).getByText('Overskrift 2.2');

  const bolk2_1 = getByLabelText('Overskrift 2.1');
  within(bolk2_1).getByText('Innhold 2.1');
  within(bolk2_1).getByText('Overskrift 2.1.1');

  const bolk2_1_1 = getByLabelText('Overskrift 2.1.1');
  within(bolk2_1_1).getByText('Innhold 2.1.1');

  const bolk2_2 = getByLabelText('Overskrift 2.2');
  within(bolk2_2).getByText('Innhold 2.2');
});
