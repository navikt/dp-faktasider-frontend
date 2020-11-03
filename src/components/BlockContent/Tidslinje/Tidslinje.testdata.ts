import { createSanityBlock, createTidslinje } from "../../../testUtils/createSanityBlock";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";

export const tidslinjeTestData = parseRichText([
  createSanityBlock("Enkel tidslinje", "h2"),
  createTidslinje([
    createSanityBlock("Punkt 1", "tidslinjepunkt"),
    createSanityBlock("Innhold til punkt 1", "normal"),
    createSanityBlock("Punkt 2", "tidslinjepunkt"),
    createSanityBlock("Innhold til punkt 2", "normal"),
  ]),
  createSanityBlock("Tidslinje med tekst før første punkt", "h2"),
  createTidslinje([
    createSanityBlock("Innhold før første punkt", "normal"),
    createSanityBlock("Punkt 1", "tidslinjepunkt"),
    createSanityBlock("Innhold til punkt 1", "normal"),
    createSanityBlock("Punkt 2", "tidslinjepunkt"),
    createSanityBlock("Innhold til punkt 2", "normal"),
  ]),
]);
