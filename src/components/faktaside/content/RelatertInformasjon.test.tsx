import React from "react";
import { render, within } from "../../../testUtils/customized-testing-library";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { createSanityBlock, translated } from "../../../testUtils/createSanityBlock";

describe("relatert innformasjon", () => {
  test("vises ikke om det ikke finnes innhold i relatert innformajson", () => {
    const result = render(<TestFaktaside partialFaktaside={{ relatertInformasjon: translated([]) }} />);

    const main = result.getByRole("main");
    expect(within(main).queryByLabelText(/Snarveier/)).toBeFalsy();
  });

  test("vises ikke i innholdsmeny om det ikke finnes innhold i relatert innformasjon", () => {
    const result = render(<TestFaktaside partialFaktaside={{ relatertInformasjon: translated([]) }} />);

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    expect(within(meny).queryByLabelText(/Snarveier/)).toBeFalsy();
  });

  test("vises dersom det finnes innhold i relatert innformasjon", () => {
    const result = render(
      <TestFaktaside
        partialFaktaside={{
          relatertInformasjon: translated([createSanityBlock("Litt relatert info")]),
        }}
      />
    );

    const relatertInfo = result.getByLabelText(/Snarveier/i);
    within(relatertInfo).getByText("Litt relatert info");
  });

  test("vises i meny dersom det finnes innhold i relatert informasjon", () => {
    const result = render(
      <TestFaktaside
        partialFaktaside={{
          relatertInformasjon: translated([createSanityBlock("Litt relatert info")]),
        }}
      />
    );

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    within(meny).getByText(/Snarveier/i);
  });
});
