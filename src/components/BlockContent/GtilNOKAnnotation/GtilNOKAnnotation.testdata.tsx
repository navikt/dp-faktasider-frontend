import { createSanityBlock } from "../../../testUtils/createSanityBlock";

export const GtilNOKAnnotationTestdata = [
  createSanityBlock("Dette er en overskrift", { style: "h2" }),
  createSanityBlock("2", { marks: ["GtilNOK"] }),
];
