import { render, within } from "../../../testUtils/customized-testing-library";
import React from "react";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { mockMenuData } from "../../../sanity/groq/menu/mockMenuData";

// 'partialContext={{ id: 'N/A'}}' gjør at det ikke rendres innholdsliste som en del av sidelisten.
// Innholdslisten inneholder også lenker som gjorde det litt vanskelig å skrive disse testene

describe("Navigasjonsmeny", () => {
  test("inneholder en liste med lenker til alle sider i appen", () => {
    const result = render(<TestFaktaside partialMeny={mockMenuData} />);

    const desktopNavigasjonsmeny = result.getAllByLabelText(/Sideoversikt/i)[0];
    const sideliste = within(desktopNavigasjonsmeny).getAllByRole("list")[0];
    const lenker = within(sideliste).getAllByRole("listitem");

    expect(lenker).toHaveLength(mockMenuData.sider.length + mockMenuData.lenker.length);
  });

  test("lenkene er bygd opp riktig", () => {
    const result = render(<TestFaktaside partialMeny={mockMenuData} />);

    const desktopNavigasjonsmeny = result.getAllByLabelText(/Sideoversikt/i)[0];
    const sideliste = within(desktopNavigasjonsmeny).getAllByRole("list")[0];
    const lenker = within(sideliste).getAllByRole("link") as HTMLLinkElement[];

    const expectedHrefs = [
      ...mockMenuData.lenker.map((it) => (it._type === "eksternLenke" ? it.url : undefined)),
      ...mockMenuData.sider.map((it) => it.slug),
    ].filter(Boolean);
    const actualHrefs = lenker.map((it) => it.href);

    expect(actualHrefs[0]).toContain(expectedHrefs[0]);
    expect(actualHrefs[1]).toContain(expectedHrefs[1]);
    expect(actualHrefs[2]).toContain(expectedHrefs[2]);
  });
});
