import React from "react";
import { render, within } from "../../../testUtils/customized-testing-library";
import BlockContent from "../BlockContent";
import { tidslinjeTestData } from "./Tidslinje.testdata";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";

describe("tidslinje", () => {
  const parsedTestData = parseRichText(tidslinjeTestData);

  test("lager en tidslinje med et tidslinjepunkt pr element", () => {
    const result = render(<BlockContent blocks={parsedTestData} />);

    const enkelTidslinje = result.getByLabelText("Enkel tidslinje");
    expect(within(enkelTidslinje).getAllByRole("listitem")).toHaveLength(2);
  });

  test("innholdet i punktene ligger inne i riktig listeelement", () => {
    const result = render(<BlockContent blocks={parsedTestData} />);

    const enkelTidslinje = result.getByLabelText("Enkel tidslinje");

    const punkt1 = within(enkelTidslinje).getByLabelText("Punkt 1");
    within(punkt1).getByText("Innhold til punkt 1");

    const punkt2 = within(enkelTidslinje).getByLabelText("Punkt 2");
    within(punkt2).getByText("Innhold til punkt 2");
  });

  test("dersom tidslinje inneholder tekst før første punkt laget et tomt punkt med teksten før resten av tidslinjen", () => {
    const result = render(<BlockContent blocks={parsedTestData} />);

    const tidslinjeMedTekstFørFørsePunkt = result.getByLabelText("Tidslinje med tekst før første punkt");
    expect(within(tidslinjeMedTekstFørFørsePunkt).getAllByRole("listitem")).toHaveLength(3);
  });
});
