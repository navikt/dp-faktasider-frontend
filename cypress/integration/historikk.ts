const url = "http://localhost:3000/arbeid/historikk";

describe("historikk funker - ", () => {
  it("Sjekker at vi greier å besøke oversikten til historikk", () => {
    cy.visit(url);

    cy.findByRole("heading", { name: /Historikk/i });
  });
});
