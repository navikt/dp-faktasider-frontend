describe("historikk funker - ", () => {
  const url = "http://localhost:3000/arbeid/historikk";

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

      cy.wait(10000);

      cy.findByRole("heading", { name: /Historiske/i });
      cy.findByRole("main").within(() => {
        cy.findByRole("button", { name: /endre/i }).click();
        cy.findAllByRole("link").first().next().click();
      });

      /* TODO få denne delen av testen til å funke i github-action. Trøbbel med at menyen ikke lukker seg automatisk, men det gjør den lokalt 🤷‍♀️
      cy.wait(10000);
      cy.findByRole("main").within(() => {
        cy.findByRole("button", { name: /endre/i, expanded: false }).click();
        cy.findAllByRole("link")
          .first()
          .next()
          .contains(/vises nå/i);
      });
      */
    }
  );
});
