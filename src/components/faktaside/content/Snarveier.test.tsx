import React from "react";
import { render, within } from "../../../testUtils/customized-testing-library.test";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { Snarvei } from "../../../sanity/groq/forside/forsideQuery";

const id = "testId";

const snarvei: Snarvei = {
  _type: "snarvei",
  url: "vg.no",
  tittel: "En snarvei til vg",
  visPaaSider: [id],
};

describe("snarveier", () => {
  test("vises ikke om det ikke finnes innhold i snarveier", () => {
    const result = render(<TestFaktaside partialOppsett={{ snarveier: [] }} />);

    const main = result.getByRole("main");
    expect(within(main).queryByLabelText(/Snarveier/)).toBeFalsy();
  });

  test("vises ikke i innholdsmeny om det ikke finnes innhold i snarveier", () => {
    const result = render(<TestFaktaside partialOppsett={{ snarveier: [] }} />);

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    expect(within(meny).queryByLabelText(/Snarveier/)).toBeFalsy();
  });

  test("vises dersom det finnes innhold i snarveier", () => {
    const result = render(<TestFaktaside partialFaktaside={{ id }} partialOppsett={{ snarveier: [snarvei] }} />);

    const snarveier = result.getByLabelText(/Snarveier/i);
    within(snarveier).getByText("En snarvei til vg");
  });

  test("vises i meny dersom det finnes innhold i snarveier", () => {
    const result = render(<TestFaktaside partialFaktaside={{ id }} partialOppsett={{ snarveier: [snarvei] }} />);

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    within(meny).getByText(/Snarveier/i);
  });
});
