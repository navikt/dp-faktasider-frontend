import { createSanityBlock } from "../../../testUtils/createSanityBlock";

export const utkastTestData = [
  createSanityBlock("Utkast i bulletpointliste", { listItem: "bullet", marks: ["utkast"] }),
  createSanityBlock("Litt tekst", { listItem: "bullet" }),
  createSanityBlock("Frittstående utkast", { marks: ["utkast"] }),
  createSanityBlock("Frittstående tekst"),
  createSanityBlock("Overskrift utkast", { style: "h2", marks: ["utkast"] }),
  createSanityBlock("Påfølgende innhold"),
  createSanityBlock("Overskrift vanlig", { style: "h2" }),
];
