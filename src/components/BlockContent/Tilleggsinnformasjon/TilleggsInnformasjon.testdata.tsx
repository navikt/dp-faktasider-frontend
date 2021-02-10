import { createSanityBlock, createTillegsInformasjon } from "../../../testUtils/createSanityBlock";
import { SanityBlock } from "../../../utils/richTextUtils/richTextTypes";

export const tillegsinformasjonTestData: SanityBlock[] = [
  createSanityBlock("Overskrift", { style: "h2" }),
  createSanityBlock("Litt informasjon"),
  createTillegsInformasjon("Ekstra info", [createSanityBlock("Dette er tillegsinformasjon å vite")]),
];
