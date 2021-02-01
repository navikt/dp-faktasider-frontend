import { createSanityBlock } from "../../../testUtils/createSanityBlock";

export const utkastTestData = [
  createSanityBlock("Utkast i bulletpointliste", "normal", { listItem: "bullet", marks: ["utkast"] }),
  createSanityBlock("Litt tekst", "normal", { listItem: "bullet" }),
  createSanityBlock("Frittstående utkast", "normal", { marks: ["utkast"] }),
  createSanityBlock("Frittstående tekst", "normal"),
  createSanityBlock("Overskrift utkast", "h2", { marks: ["utkast"] }),
  createSanityBlock("Påfølgende innhold", "normal"),
  createSanityBlock("Overskrift vanlig", "h2"),
];
