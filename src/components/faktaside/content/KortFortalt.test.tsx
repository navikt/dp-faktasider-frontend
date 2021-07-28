import React from "react";
import { render, within } from "../../../testUtils/customized-testing-library.test";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { createSanityBlock, translated } from "../../../testUtils/createSanityBlock";

describe("kortFortalt", () => {
  test("vises ikke om det ikke finnes innhold i kort fortalt", () => {
    const result = render(<TestFaktaside partialFaktaside={{ kortFortalt: translated([]) }} />);

    result.queryByLabelText(/Kort fortalt/);
  });

  test("vises ikke i innholdsmeny om det ikke finnes innhold i kort fortalt", () => {
    const result = render(<TestFaktaside partialFaktaside={{ kortFortalt: translated([]) }} />);

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    expect(within(meny).queryByLabelText(/Kort fortalt/)).toBeFalsy();
  });

  test("vises dersom det finnes innhold i kort fortalt", () => {
    const result = render(
      <TestFaktaside
        partialFaktaside={{
          kortFortalt: translated([createSanityBlock("Litt innhold")]),
        }}
      />
    );

    const kortFortalt = result.getByLabelText("Kort fortalt");
    within(kortFortalt).getByText("Litt innhold");
  });

  test("vises i meny dersom det finnes innhold i kort fortalt", () => {
    const result = render(
      <TestFaktaside
        partialFaktaside={{
          kortFortalt: translated([createSanityBlock("Litt innhold")]),
        }}
      />
    );

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    within(meny).getByText(/Kort fortalt/i);
  });
});
