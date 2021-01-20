import { render, within } from "../../../testUtils/customized-testing-library";
import { mockFaktasiderMenuData } from "../../../hooks/graphQl/mockFaktasiderMenuData";
import React from "react";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { isInternal } from "../../../hooks/graphQl/menuDataUtils";

// 'partialContext={{ id: 'N/A'}}' gjør at det ikke rendres innholdsliste som en del av sidelisten.
// Innholdslisten inneholder også lenker som gjorde det litt vanskelig å skrive disse testene

describe("Navigasjonsmeny", () => {
  test("inneholder en liste med lenker til alle sider i appen", () => {
    const result = render(<TestFaktaside partialContext={{ id: "N/A" }} />);

    const desktopNavigasjonsmeny = result.getAllByLabelText(/Sideoversikt/i)[0];
    const sideliste = within(desktopNavigasjonsmeny).getAllByRole("list")[0];
    const lenker = within(sideliste).getAllByRole("listitem");

    expect(lenker).toHaveLength(mockFaktasiderMenuData.length);
  });

  test("lenkene er bygd opp riktig", () => {
    const result = render(<TestFaktaside partialContext={{ id: "N/A" }} />);

    const desktopNavigasjonsmeny = result.getAllByLabelText(/Sideoversikt/i)[0];
    const sideliste = within(desktopNavigasjonsmeny).getAllByRole("list")[0];
    const lenker = within(sideliste).getAllByRole("link") as HTMLLinkElement[];

    const expectedHrefs = mockFaktasiderMenuData.map((it) => (isInternal(it) ? it.path : it.url));
    const actualHrefs = lenker.map((it) => it.href);

    expect(actualHrefs[0]).toContain(expectedHrefs[0]);
    expect(actualHrefs[1]).toContain(expectedHrefs[1]);
    expect(actualHrefs[2]).toContain(expectedHrefs[2]);
  });
});
