describe("infoside", () => {
  it('Viser informasjon om hvor mange ord som er skjult når man bruker "Tilpass innhold"', () => {
    cy.viewport(1200, 600);
    cy.visit("http://localhost:3000/arbeid/testdata");
    cy.findByRole("button", { name: /Cypress - word count/ }).click();

    cy.findByLabelText(/tilpass/i).within(() => {
      cy.findByText(/permittert/i).click();
      cy.contains("viser nå 18 av 47 ord");
      cy.findByText(/permittert/i).click();
      cy.findByText(/konkurs/i).click();
      cy.contains("viser nå 10 av 47 ord");
      cy.findByText(/ingen valg/i).click();
      cy.contains("viser nå 24 av 47 ord");
    });
  });
});
