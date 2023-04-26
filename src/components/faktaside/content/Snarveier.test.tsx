import React from "react";
import { render, within } from "../../../testUtils/customized-testing-library.test.utils";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { Snarvei } from "../../../sanity/groq/forside/forsideQuery";
import { visForTestDataMenuQuery } from "../../BlockContent/VisFor/visFor.testdata";

const id = "testId";

const snarvei: Snarvei = {
  _type: "snarvei",
  url: "vg.no",
  tittel: "En snarvei til vg",
  visPaaSider: [id],
};

describe.skip("snarveier", () => {
  test("vises ikke om det ikke finnes innhold i snarveier", () => {
    const result = render(<TestFaktaside partialOppsett={{ snarveier: [] }} />);

    const main = result.getByRole("main");
    expect(within(main).queryByLabelText(/Snarveier/)).toBeFalsy();
  });

  test("vises ikke i innholdsmeny om det ikke finnes innhold i snarveier", () => {
    // @ts-ignore, må caste menudata til en partial av menuquerydata elns
    const result = render(<TestFaktaside partialOppsett={{ snarveier: [] }} partialMeny={visForTestDataMenuQuery} />);

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    expect(within(meny).queryByLabelText(/Snarveier/)).toBeFalsy();
  });

  test("vises dersom det finnes innhold i snarveier", () => {
    const result = render(<TestFaktaside partialFaktaside={{ id }} partialOppsett={{ snarveier: [snarvei] }} />);

    const snarveier = result.getByLabelText(/Snarveier/i);
    within(snarveier).getByText("En snarvei til vg");
  });

  test("vises i meny dersom det finnes innhold i snarveier", () => {
    const result = render(
      <TestFaktaside
        partialFaktaside={{ id }}
        partialOppsett={{ snarveier: [snarvei] }}
        // @ts-ignore, må caste menudata til en partial av menuquerydata elns
        partialMeny={visForTestDataMenuQuery}
      />
    );

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    within(meny).getByText(/Snarveier/i);
  });
});
