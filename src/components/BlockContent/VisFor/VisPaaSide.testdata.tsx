import {
  createDeltTekstBlock,
  createSanityBlock,
  createSanityBlockMedDeltTekstVisForAnnotation,
} from "../../../testUtils/createSanityBlock";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import { faktaSideMockContext } from "../../../testUtils/faktaSideMockContext";

const testId = faktaSideMockContext.id;

export const innhold = [
  createDeltTekstBlock([
    createSanityBlockMedDeltTekstVisForAnnotation("Overskrift som skal vises overalt", "h2", []),
    createSanityBlock("Innhold som vises for alle", "normal"),
    createSanityBlockMedDeltTekstVisForAnnotation("Vis på denne siden", "h2", [testId]),
    createSanityBlock("Innhold som skal vises", "normal"),
    createSanityBlockMedDeltTekstVisForAnnotation("Ikke vis på denne siden", "h2", ["randomId"]),
    createSanityBlock("Innhold som ikke skal vises på denne siden", "normal"),
  ]),
];

export const visPaaSideTestData = {
  innhold: parseRichText(innhold),
  id: testId,
};
