import { createSanityBlock, createTidslinje } from "../../../testUtils/createSanityBlock";

export const tidslinjeTestData = [
  createSanityBlock("Enkel tidslinje", { style: "h2" }),
  createTidslinje([
    createSanityBlock("Punkt 1", { style: "tidslinjepunkt" }),
    createSanityBlock("Innhold til punkt 1"),
    createSanityBlock("Punkt 2", { style: "tidslinjepunkt" }),
    createSanityBlock("Innhold til punkt 2"),
  ]),
  createSanityBlock("Tidslinje med tekst før første punkt", { style: "h2" }),
  createTidslinje([
    createSanityBlock("Innhold før første punkt"),
    createSanityBlock("Punkt 1", { style: "tidslinjepunkt" }),
    createSanityBlock("Innhold til punkt 1"),
    createSanityBlock("Punkt 2", { style: "tidslinjepunkt" }),
    createSanityBlock("Innhold til punkt 2"),
  ]),
];
