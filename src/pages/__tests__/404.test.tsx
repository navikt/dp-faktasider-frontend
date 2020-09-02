import React from 'react';
import { render, within } from '../../testUtils/customized-testing-library';
import NotFoundPage from '../404';
import { mockFaktasiderMenuData } from '../../hooks/graphQl/mockFaktasiderMenuData';

describe('404-side', () => {
  test('inneholder info om at denne siden ikke finnes', () => {
    const result = render(<NotFoundPage />);
    result.getByText('Denne siden finnes ikke');
  });

  test('inneholder en liste med lenker til alle sider i appen', () => {
    const result = render(<NotFoundPage />);
    const liste = result.getByRole('list');
    const lenker = within(liste).getAllByRole('link');

    expect(lenker).toHaveLength(mockFaktasiderMenuData.length);
  });

  test('lenkene er bygd opp riktig', () => {
    const result = render(<NotFoundPage />);
    const liste = result.getByRole('list');
    const lenker = within(liste).getAllByRole('link') as HTMLLinkElement[];

    const expectedHrefs = mockFaktasiderMenuData.map((it) => it.path);
    const actualHrefs = lenker.map((it) => it.href);

    expect(actualHrefs[0]).toContain(expectedHrefs[0]);
    expect(actualHrefs[1]).toContain(expectedHrefs[1]);
    expect(actualHrefs[2]).toContain(expectedHrefs[2]);
  });
});
