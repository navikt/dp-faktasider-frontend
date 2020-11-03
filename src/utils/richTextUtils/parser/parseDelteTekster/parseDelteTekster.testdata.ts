import { createDeltTekstBlock, createSanityBlock } from "../../../../testUtils/createSanityBlock";

export const parseDelteTeksterTestData = [
  createSanityBlock("Overskrift utenfor delt tekst", "h2"),
  createDeltTekstBlock([
    createSanityBlock("Tekst fra delt tekst men før delt overskrift", "normal"),
    createSanityBlock("Delt overskrift", "h2"),
    createSanityBlock("Tekst etter delt overskrift", "normal"),
  ]),
  createSanityBlock("Liten overskrift etter delt tekst", "h3"),
];
