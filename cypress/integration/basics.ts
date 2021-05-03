const url = "http://localhost:3000/arbeid";

describe("basics funker - ", () => {
  it("Sjekker at dekoratør er på plass", () => {
    cy.visit(url);

    cy.findByRole("navigation", { name: /Hovedmeny/i }).within(() => {
      // Tester at dekoratøren ble lasta inn riktig så bla javascript funker, hvis knappen funker så funker javascript. Sjekker at knappen funker ved at menyen og noen lenker vises.
      cy.findByRole("button", { name: /meny/i }).click();
      cy.findByRole("region", { name: /Arbeidssøker/i }).within(() => {
        cy.findByRole("link", { name: /Permittert/i });
        cy.findByRole("link", { name: /Arbeidsledig/i });
      });
      cy.findByRole("button", { name: /meny/i }).click();
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
    cy.findByRole("heading", { name: /kort fortalt/i });
    cy.findByRole("navigation", { name: /Sideoversikt/i }).within(() => {
      cy.findByRole("button", { name: /Sideoversikt/i }).click();
      cy.findByRole("list", { name: /Innholdsfortegnelse/i });
      cy.findByRole("link", { name: /kort fortalt/i });
      cy.findByRole("link", { name: /Snarveier/i });
    });
  });
});
