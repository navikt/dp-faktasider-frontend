import { TestId } from "../../src/utils/test-ids";

describe("basics funker - ", () => {
  const url = "http://localhost:3000/arbeid";

  it("Sjekker at dekoratør er på plass", () => {
    cy.visit(url);

    cy.findByRole("navigation", { name: /Hovedmeny/i }).within(() => {
      cy.findByRole("button", { name: /meny/i });
      cy.findByRole("button", { name: /søk/i });
    });

    cy.findByRole("navigation", { name: /Brødsmulesti/i });
  });

  it('er mulig å navigere fra forside til infosider"', () => {
    cy.visit(url);
    cy.findByRole("main").within(() => {
      cy.findByRole("region", { name: /Velg din situasjon/i }).within(() => {
        cy.findAllByRole("link").first().click();
      });
    });

    // Skal nå ha navigert til infoside, leter etter noen ting som vi forventer å finne på en infoside
    cy.findByTestId(TestId.KORT_FORTALT);
    cy.findByTestId(TestId.MOBILE_NAVIGATION).within(() => {
      cy.findByRole("button", { name: /Sideoversikt/i }).click();
      cy.findByRole("list", { name: /Innholdsfortegnelse/i });
      cy.findByRole("link", { name: /kort fortalt/i });
      cy.findByRole("link", { name: /Snarveier/i });
    });
  });
});
