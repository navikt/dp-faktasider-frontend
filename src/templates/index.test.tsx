import React from 'react';
import { PureIndexPage } from '.';
import { render, within } from '../testUtils/customized-testing-library';
import { mockFaktasiderMenuData } from '../hooks/graphQl/mockFaktasiderMenuData';

test('Index-side inneholder lenker til undersider med ingress', () => {
  const result = render(
    <PureIndexPage
      projectData={{ title: 'Arbeid', eksterneLenker: [], folketrygdensGrunnbellop: 1, ingress: '' }}
      sider={mockFaktasiderMenuData}
      path={'test'}
    />
  );

  const lenkeListe = result.getAllByRole('list')[1];
  const lenker = within(lenkeListe).getAllByRole('link');

  expect(lenker).toHaveLength(mockFaktasiderMenuData.length);

  const lenkeNummer2 = result.getByText(mockFaktasiderMenuData[1].tittel) as HTMLLinkElement;
  expect(lenkeNummer2.href).toContain(mockFaktasiderMenuData[1].path);
  result.getByText(mockFaktasiderMenuData[1].ingress);
});
