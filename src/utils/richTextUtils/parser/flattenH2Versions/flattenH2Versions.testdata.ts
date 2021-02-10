import { createSanityBlock } from "../../../../testUtils/createSanityBlock";

export const flattenH2TestData = [
  createSanityBlock("Vanlig overskrift", { style: "h2" }),
  createSanityBlock("Overskrift uten bakgrunn", { style: "h2-no-background" }),
  createSanityBlock("Overskrift med meny", { style: "h2-m-meny" }),
  createSanityBlock("Menypunkt", { style: "h3" }),
];
