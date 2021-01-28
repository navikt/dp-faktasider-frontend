import React from "react";
import { render, within } from "../../testUtils/customized-testing-library";
import TestFaktaside from "../../testUtils/TestFaktaside";
import { createSanityBlock } from "../../testUtils/createSanityBlock";

describe("kortFortalt", () => {
  test("vises ikke om det ikke finnes innhold i kort fortalt", () => {
    const result = render(<TestFaktaside partialContext={{ innhold: [], kortFortalt: [], relatertInformasjon: [] }} />);

    const main = result.getByRole("main");
    expect(within(main).queryAllByRole("heading")).toHaveLength(0);
  });

  test("vises ikke i innholdsmeny om det ikke finnes innhold i kort fortalt", () => {
    const result = render(<TestFaktaside partialContext={{ kortFortalt: [] }} />);

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    expect(within(meny).queryByLabelText(/Kort fortalt/)).toBeFalsy();
  });

  test("vises dersom det finnes innhold i kort fortalt", () => {
    const result = render(
      <TestFaktaside
        partialContext={{
          kortFortalt: [createSanityBlock("Litt innhold", "normal")],
        }}
      />
    );

    const kortFortalt = result.getByLabelText("Kort fortalt");
    within(kortFortalt).getByText("Litt innhold");
  });

  test("vises i meny dersom det finnes innhold i kort fortalt", () => {
    const result = render(
      <TestFaktaside
        partialContext={{
          kortFortalt: [createSanityBlock("Litt innhold", "normal")],
        }}
      />
    );

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    within(meny).getByText(/Kort fortalt/i);
  });
});
