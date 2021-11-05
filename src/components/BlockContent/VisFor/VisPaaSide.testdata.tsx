import { createDeltTekstBlock, createSanityBlock, translated } from "../../../testUtils/createSanityBlock";
import { faktaSideMockQueryData } from "../../../testUtils/faktaSideMockQueryData";

const testId = faktaSideMockQueryData.faktaside.id;

export const innhold = [
  createDeltTekstBlock([
    createSanityBlock("Overskrift som skal vises overalt", { style: "h2", visPaa: [] }),
    createSanityBlock("Innhold som vises for alle"),
    createSanityBlock("Vis på denne siden", { style: "h2", visPaa: [testId] }),
    createSanityBlock("Innhold som skal vises"),
    createSanityBlock("Ikke vis på denne siden", { style: "h2", visPaa: ["randomId"] }),
    createSanityBlock("Innhold som ikke skal vises på denne siden"),
    createSanityBlock("Bolk med bullets", { style: "h2" }),
    createSanityBlock("Bullet som skal vises", { visPaa: [testId], listItem: "bullet" }),
    createSanityBlock("Bullet som ikke skal vises", { visPaa: ["annen side"], listItem: "bullet" }),
  ]),
];

export const visPaaSideTestData = {
  innhold: translated(innhold),
  id: testId,
};
