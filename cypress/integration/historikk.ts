const url = "http://localhost:3000/arbeid/historikk";

describe("historikk funker - ", () => {
  it("Sjekker at vi greier å besøke oversikten til historikk", () => {
    cy.visit(url);

    cy.findByRole("heading", { name: /Historikk/i });
  });
  it(
    "Sjekker at vi kan klikke en historisk visning i oversikten, " +
      "samt velge en historisk side i menyen når siden er lastet",
    () => {
      cy.visit(url);

      cy.findByRole("main").within(() => cy.findAllByRole("link").first().click());

      cy.wait(7000);

      cy.findByRole("heading", { name: /Historiske/i });
      cy.findByRole("main").within(() => {
        cy.findAllByRole("button").first().click();
        cy.findAllByRole("link").first().next().next().next().click();
      });
    }
  );
});
