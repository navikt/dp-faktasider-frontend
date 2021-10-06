import React from "react";
import { render, within } from "../../../../testUtils/customized-testing-library.test.utils";
import { SanityContent } from "../../../../components/sanity-content/SanityContent";
import parseRichText from "../parseRichText";
import { flattenH2TestData } from "./flattenH2Versions.testdata";

describe("flattenH2Versions", () => {
  const parsedBlocks = parseRichText(flattenH2TestData);

  test("alle h2-versjoner blir til grupper", () => {
    const result = render(<SanityContent blocks={parsedBlocks} />);
    const bolker = result.container.querySelectorAll(`h2`);
    expect(bolker).toHaveLength(3);
  });

  test("h2 med meny får en meny med innhold", () => {
    const result = render(<SanityContent blocks={parsedBlocks} />);

    const bolkMedMeny = result.getByLabelText("Overskrift med meny");
    const bolkMeny = within(bolkMedMeny).getByLabelText("Innhold Overskrift med meny");
    const menyPunkt = within(bolkMeny).getByText("Menypunkt") as HTMLAnchorElement;

    expect(menyPunkt.href).toBeTruthy();
  });
});
