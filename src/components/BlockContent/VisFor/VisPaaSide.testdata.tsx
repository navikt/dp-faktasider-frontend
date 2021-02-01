import { createDeltTekstBlock, createSanityBlock, translated } from "../../../testUtils/createSanityBlock";
import { faktaSideMockQueryData } from "../../../testUtils/faktaSideMockQueryData";

const testId = faktaSideMockQueryData.faktaside.id;

export const innhold = [
  createDeltTekstBlock([
    createSanityBlock("Overskrift som skal vises overalt", "h2", { visPaa: [] }),
    createSanityBlock("Innhold som vises for alle", "normal"),
    createSanityBlock("Vis på denne siden", "h2", { visPaa: [testId] }),
    createSanityBlock("Innhold som skal vises", "normal"),
    createSanityBlock("Ikke vis på denne siden", "h2", { visPaa: ["randomId"] }),
    createSanityBlock("Innhold som ikke skal vises på denne siden", "normal"),
    createSanityBlock("Bolk med bullets", "h2"),
    createSanityBlock("Bullet som skal vises", "normal", { visPaa: [testId], listItem: "bullet" }),
    createSanityBlock("Bullet som ikke skal vises", "normal", { visPaa: ["annen side"], listItem: "bullet" }),
  ]),
];

export const visPaaSideTestData = {
  innhold: translated(innhold),
  id: testId,
};
