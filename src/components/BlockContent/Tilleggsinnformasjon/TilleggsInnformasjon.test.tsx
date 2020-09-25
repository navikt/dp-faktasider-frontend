import React from 'react';
import { fireEvent, render, within } from '../../../testUtils/customized-testing-library';
import TestFaktaside from '../../../testUtils/TestFaktaside';
import { tillegsinformasjonTestData } from './TilleggsInnformasjon.testdata';

describe('tillegsinformasjon', () => {
  test('vises i en aside med overskrift og innhold', () => {
    const result = render(<TestFaktaside innhold={tillegsinformasjonTestData} />);

    const aside = result.getByRole('complementary');

    within(aside).getByText('Ekstra info');
    within(aside).getByText('Dette er tillegsinformasjon å vite');
  });

  test('viser en vismerknapp man kan trykke på for å ekspandere', () => {
    const result = render(<TestFaktaside innhold={tillegsinformasjonTestData} />);

    const knapp = result.getByText('Vis mer');

    expect(knapp.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(knapp);

    expect(knapp.getAttribute('aria-expanded')).toBe('true');
  });

  test('tillegsinformasjon får hashlenke og id', () => {
    const result = render(<TestFaktaside innhold={tillegsinformasjonTestData} />);

    const aside = result.getByRole('complementary');
    const header = within(aside).getByRole('heading');
    const lenke = within(header).getByRole('link');

    expect(lenke.getAttribute('href')).toContain('#ekstra-info');
    expect(header.getAttribute('id')).toContain('ekstra-info');
  });
});
