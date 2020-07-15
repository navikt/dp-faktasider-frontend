import React from 'react';
import BlockContent from '../BlockContent';
import { fireEvent, render, within } from '../../../testUtils/customized-testing-library';
import { visForTestData } from './visFor.testdata';
import TestFaktaside from '../../../testUtils/TestFaktaside';

const { innhold } = visForTestData;
const {
  bolkStudent,
  bolkPermittert,
  innholdPermittert,
  innholdStudent,
  bolkForAlle,
  innholdForAlle,
} = visForTestData.tekster;

describe('visFor-logikk', () => {
  test('Hvis ingen filtrering er valgt vises all tekst', () => {
    const result = render(<BlockContent blocks={innhold} />);

    result.getByLabelText(bolkStudent);
    result.getByLabelText(bolkPermittert);
    result.getByText(innholdStudent);
    result.getByText(innholdPermittert);
  });

  test('Hvis man filtrer på student vises ikke permittertinnhold', async () => {
    const result = render(<TestFaktaside innhold={innhold} />);

    const tilpassInnhold = result.getByLabelText(/Tilpass/);
    const studentCheckbox = within(tilpassInnhold).getByLabelText(/Student/i);

    fireEvent.click(studentCheckbox);

    expect(result.queryByText(innholdPermittert)).toBeNull();
    expect(result.queryByText(bolkPermittert)).toBeNull();

    result.getByText(innholdStudent);
    result.getByLabelText(bolkStudent);
  });

  test('Hvis man fjerner filtrering vises alt innhold', async () => {
    const result = render(<TestFaktaside innhold={innhold} />);

    const tilpassInnhold = result.getByLabelText(/Tilpass/);
    const permittertCheckbox = within(tilpassInnhold).getByLabelText(/Permittert/i);

    fireEvent.click(permittertCheckbox);

    expect(result.queryByText(innholdStudent)).toBeNull();

    fireEvent.click(permittertCheckbox);

    result.getByText(innholdStudent);
  });

  test('Hvis man filtrer på ingen valg passer vises hverken permittertinnhold eller studentinnhold, men vanlig innhold vises', async () => {
    const result = render(<TestFaktaside innhold={innhold} />);

    const tilpassInnhold = result.getByLabelText(/Tilpass/);
    const ingenPasserCheckbox = within(tilpassInnhold).getByLabelText(/Ingen valg/i);

    fireEvent.click(ingenPasserCheckbox);

    expect(result.queryByText(innholdPermittert)).toBeNull();
    expect(result.queryByText(bolkPermittert)).toBeNull();
    expect(result.queryByText(innholdStudent)).toBeNull();
    expect(result.queryByLabelText(bolkStudent)).toBeNull();

    result.getByLabelText(bolkForAlle);
    result.getByText(innholdForAlle);
  });
});
