import React from 'react';
import { groupMarkupTestData } from './GroupMarkup.testdata';
import BlockContent from '../BlockContent';
import { render, within } from '../../../testUtils/customized-testing-library';

describe('group-markup', () => {
  test('h2-gruppe får overskrift med ankerlenke og anchor', () => {
    const result = render(<BlockContent blocks={groupMarkupTestData} />);
    const bolk = result.getByLabelText(/Overskrift 1/i);
    const lenke = within(bolk).getByRole('link');

    expect(lenke.getAttribute('href')).toContain('#overskrift-1');
    expect(bolk.querySelector('[id="overskrift-1"]')).toBeTruthy();
  });

  test('h2-gruppe får overskrift og innhold', () => {
    const result = render(<BlockContent blocks={groupMarkupTestData} />);

    result.getByLabelText(/Overskrift 1/i);
    result.getByText(/Innhold 1/i);
  });
});
