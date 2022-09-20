import React from "react";
import { render, within } from "../../../testUtils/customized-testing-library.test.utils";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { createSanityBlock, translated } from "../../../testUtils/createSanityBlock";
import { visForTestDataMenuQuery } from "../../BlockContent/VisFor/visFor.testdata";

describe("kortFortalt", () => {
  test("vises ikke om det ikke finnes innhold i kort fortalt", () => {
    const result = render(<TestFaktaside partialFaktaside={{ kortFortalt: translated([]) }} />);

    result.queryByLabelText(/Kort fortalt/);
  });

  test("vises ikke i innholdsmeny om det ikke finnes innhold i kort fortalt", () => {
    const result = render(
      // @ts-ignore, må caste menudata til en partial av menuquerydata elns
      <TestFaktaside partialFaktaside={{ kortFortalt: translated([]) }} partialMeny={visForTestDataMenuQuery} />
    );

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
        }} // @ts-ignore, må caste menudata til en partial av menuquerydata elns
        partialMeny={visForTestDataMenuQuery}
      />
    );

    const meny = result.getAllByLabelText(/Innholdsfortegnelse/i)[0];
    within(meny).getByText(/Kort fortalt/i);
  });
});
