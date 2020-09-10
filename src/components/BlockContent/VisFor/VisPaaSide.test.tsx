import React from 'react';
import TestFaktaside from '../../../testUtils/TestFaktaside';
import { render, within } from '../../../testUtils/customized-testing-library';
import { visPaaSideTestData } from './VisPaaSide.testdata';

describe('innhold i delt tekst merket med visPaa', () => {
  test('skal vises for alle sider dersom innholdet er merket med et tomt visPaa-array', () => {
    const page = render(<TestFaktaside partialContext={visPaaSideTestData} />);

    page.getByLabelText('Overskrift som skal vises overalt');
  });

  test('skal vises på sider den er merket for å vises på', () => {
    const page = render(<TestFaktaside partialContext={visPaaSideTestData} />);

    const bolk = page.getByLabelText('Vis på denne siden');
    within(bolk).getByText('Innhold som skal vises');
  });

  test('skal vises i menyen på sider den er merket for å vises på', () => {
    const page = render(<TestFaktaside partialContext={visPaaSideTestData} />);

    const meny = page.getAllByLabelText(/innholdsfortegnelse/i)[0];
    within(meny).getByText('Vis på denne siden');
  });

  test('skal ikke vises på sider den ikke er merket for å vises på', () => {
    const page = render(<TestFaktaside partialContext={visPaaSideTestData} />);

    expect(page.queryByLabelText('Ikke vis på denne siden')).toBeFalsy();
  });

  test('skal ikke vises i menyen på sider den ikke er merket for å vises på', () => {
    const page = render(<TestFaktaside partialContext={visPaaSideTestData} />);

    const meny = page.getAllByLabelText(/innholdsfortegnelse/i)[0];

    expect(within(meny).queryByText('Ikke vis på denne siden')).toBeNull();
  });
});
