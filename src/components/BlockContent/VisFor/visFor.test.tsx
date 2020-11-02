import React from "react";
import BlockContent from "../BlockContent";
import { render, within } from "../../../testUtils/customized-testing-library";
import { visForTestData } from "./visFor.testdata";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { toggleFilter } from "../../../testUtils/tilpassInnholdUtils";

const { innhold } = visForTestData;
const {
  bolkStudent,
  bolkPermittert,
  innholdPermittert,
  innholdStudent,
  bolkForAlle,
  innholdForAlle,
  bolkSkjulForPermittertOgKonkurs,
} = visForTestData.tekster;

describe("visFor-logikk", () => {
  test("Hvis ingen filtrering er valgt vises all tekst", () => {
    const result = render(<BlockContent blocks={innhold} />);

    result.getByLabelText(bolkStudent);
    result.getByLabelText(bolkPermittert);
    result.getByText(innholdStudent);
    result.getByText(innholdPermittert);
  });

  test("Hvis man filtrer på student vises ikke permittertinnhold", async () => {
    const result = render(<TestFaktaside innhold={innhold} />);

    toggleFilter(result, /Student/i);

    const mainContent = result.getByRole("main");
    expect(within(mainContent).queryByText(innholdPermittert)).toBeNull();
    expect(within(mainContent).queryByText(bolkPermittert)).toBeNull();

    within(mainContent).getByText(innholdStudent);
    within(mainContent).getByLabelText(bolkStudent);

    const meny = result.getAllByLabelText(/innholdsfortegnelse/i)[0];
    expect(within(meny).queryByText(bolkPermittert)).toBeNull();

    within(meny).getByText(bolkStudent);
  });

  test("Hvis man fjerner filtrering vises alt innhold", async () => {
    const result = render(<TestFaktaside innhold={innhold} />);

    toggleFilter(result, /Permittert/i);

    expect(result.queryByText(innholdStudent)).toBeNull();

    toggleFilter(result, /Permittert/i);

    result.getByText(innholdStudent);
  });

  test("Hvis man filtrer på ingen valg passer vises hverken permittertinnhold eller studentinnhold, men vanlig innhold vises", async () => {
    const result = render(<TestFaktaside innhold={innhold} partialContext={{ visIngenValgPasser: true }} />);

    toggleFilter(result, /Ingen valg/i);

    expect(result.queryByText(innholdPermittert)).toBeNull();
    expect(result.queryByText(bolkPermittert)).toBeNull();
    expect(result.queryByText(innholdStudent)).toBeNull();
    expect(result.queryByLabelText(bolkStudent)).toBeNull();

    result.getByLabelText(bolkForAlle);
    result.getByText(innholdForAlle);
  });

  test("bulletpoint med visFor på hele teksten skjules dersom det filtreres bort", () => {
    const result = render(<TestFaktaside innhold={innhold} partialContext={{ visIngenValgPasser: true }} />);

    const førsteBolk = result.getByLabelText(bolkForAlle);

    expect(within(førsteBolk).getAllByRole("listitem")).toHaveLength(2);

    toggleFilter(result, /ingen valg/i);

    expect(within(førsteBolk).getAllByRole("listitem")).toHaveLength(1);
  });
});

describe("skjulFor-logikk", () => {
  test("Vises dersom ingen filtrering er valgt", () => {
    const result = render(<BlockContent blocks={innhold} />);

    result.getByLabelText(bolkSkjulForPermittertOgKonkurs);
  });

  test("Skjules dersom situasjon teksten skal skjules for er valgt", () => {
    const result = render(<TestFaktaside innhold={innhold} />);

    toggleFilter(result, /Permittert/i);

    expect(result.queryByText(bolkSkjulForPermittertOgKonkurs)).toBeNull();
  });

  test("skjules ikke dersom situasjon som ikke er merket med at teksten skal skjules er valgt", () => {
    const result = render(<TestFaktaside innhold={innhold} />);

    toggleFilter(result, /Student/i);

    result.getByLabelText(bolkSkjulForPermittertOgKonkurs);
  });

  test('skjules ikke dersom "ingen valg passer" er valgt', () => {
    const result = render(<TestFaktaside innhold={innhold} partialContext={{ visIngenValgPasser: true }} />);

    toggleFilter(result, /Ingen valg/i);

    result.getByLabelText(bolkSkjulForPermittertOgKonkurs);
  });

  test("skjules ikke dersom man har valgt to situasjoner, en den skal skjules for og en den ikke skal skjules for", () => {
    const result = render(<TestFaktaside innhold={innhold} partialContext={{ visIngenValgPasser: true }} />);

    toggleFilter(result, /Permittert/i);
    toggleFilter(result, /Student/i);

    result.getByLabelText(bolkSkjulForPermittertOgKonkurs);
  });

  test("skjules dersom man har huket av to situasjoner der teksten skal skjules for begge", () => {
    const result = render(<TestFaktaside innhold={innhold} partialContext={{ visIngenValgPasser: true }} />);

    toggleFilter(result, /Permittert/i);
    toggleFilter(result, /Konkurs/i);

    expect(result.queryByText(bolkSkjulForPermittertOgKonkurs)).toBeNull();
  });
});
