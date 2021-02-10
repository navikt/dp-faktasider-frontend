import { createDeltTekstBlock, createSanityBlock } from "../../../../testUtils/createSanityBlock";

export const parseDelteTeksterTestData = [
  createSanityBlock("Overskrift utenfor delt tekst", { style: "h2" }),
  createDeltTekstBlock([
    createSanityBlock("Tekst fra delt tekst men før delt overskrift"),
    createSanityBlock("Delt overskrift", { style: "h2" }),
    createSanityBlock("Tekst etter delt overskrift"),
  ]),
  createSanityBlock("Liten overskrift etter delt tekst", { style: "h3" }),
];
