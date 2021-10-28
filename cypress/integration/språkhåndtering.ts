/* Tekster er oversatt i to forskjellige systemer:
 *
 *  * Mikrotekster på knapper etc er stortsett hardkodet og språkversjonert vha i18next-biblioteket
 *  * Innhold kommer fra Sanity og er språkversjonert der og oversettes vha en utility-funksjon (localizeSanityContent)
 *
 *  Vi tester at begge systemene funker og kan styres vha språk i url
 *
 * */
import { TestId } from "../../src/utils/test-ids";

describe("Spårkversjonering", () => {
  const url = "http://localhost:3000/arbeid";

  it("funker på norsk", () => {
    cy.visit(`${url}/testdata`);
    cy.findByRole("button", { name: /Cypress - språktest/ }).click();

    cy.findByTestId(TestId.KORT_FORTALT).within(() => {
      // "Kort fortalt" er en mikrotekst som er hardkodet og oversatt ved hjelp av i18next
      cy.findByText(/Norsk innhold/i); // "Norsk innhold" er simulert Sanity-innhold
    });
  });

  it("funker på engelsk", () => {
    cy.visit(`${url}/en/testdata`);
    cy.findByRole("button", { name: /Cypress - språktest/ }).click();

    cy.findByTestId(TestId.KORT_FORTALT).within(() => {
      cy.findByText(/English content/i);
    });
  });
});
