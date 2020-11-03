import { createSanityBlock } from "../../../testUtils/createSanityBlock";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";

export const groupMarkupTestData = parseRichText([
  createSanityBlock("Overskrift 1", "h2"),
  createSanityBlock("Innhold 1", "normal"),
]);
