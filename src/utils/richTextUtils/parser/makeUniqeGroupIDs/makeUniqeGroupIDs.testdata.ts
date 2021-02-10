import { createSanityBlock } from "../../../../testUtils/createSanityBlock";

export const makeUniqueIdTestData = [
  createSanityBlock("Unik overskrift", { style: "h2" }),
  createSanityBlock("Duplikat overskrift", { style: "h3" }),
  createSanityBlock("Innhold 1"),
  createSanityBlock("Duplikat overskrift", { style: "h2" }),
  createSanityBlock("Innhold 2"),
];
