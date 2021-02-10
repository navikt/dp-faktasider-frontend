import { createSanityBlock } from "../../../../testUtils/createSanityBlock";

export const groupParserTestData = [
  createSanityBlock("Overskrift 1", { style: "h2" }),
  createSanityBlock("Innhold 1"),
  createSanityBlock("Overskrift 2", { style: "h2" }),
  createSanityBlock("Innhold 2"),
  createSanityBlock("Overskrift 2.1", { style: "h3" }),
  createSanityBlock("Innhold 2.1"),
  createSanityBlock("Overskrift 2.1.1", { style: "h4" }),
  createSanityBlock("Innhold 2.1.1"),
  createSanityBlock("Overskrift 2.2", { style: "h3" }),
  createSanityBlock("Innhold 2.2"),
];
