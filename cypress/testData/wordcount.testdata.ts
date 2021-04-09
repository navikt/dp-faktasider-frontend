import { createSanityBlock } from "../../src/testUtils/createSanityBlock";

export const wordCountTestData = {
  innhold: [
    createSanityBlock("Overskrift", { style: "h2" }),
    createSanityBlock("Bulletpoint", { listItem: "bullet" }),
    createSanityBlock("Bulletpoint til student", { listItem: "bullet", visFor: ["student"] }),
    createSanityBlock("Ord til alle"),
    createSanityBlock("Fire ord til student", { visFor: ["student"] }),
    createSanityBlock("Fire ord til permittert", { visFor: ["permittert"] }),
    createSanityBlock("Bolk til student", { style: "h2", visFor: ["student"] }),
    createSanityBlock("Studentinnhold"),
    createSanityBlock("Bolk til permittert", { style: "h2", visFor: ["permittert"] }),
    createSanityBlock("Permittertinnhold"),
    createSanityBlock("Bolk som skjules for permittert og konkurs", {
      style: "h2",
      visFor: ["permittert", "konkurs"],
      omvendtFiltrering: true,
    }),
    createSanityBlock("Innhold som skjules for permittert og konkurs"),
  ],
  kortFortalt: [
    createSanityBlock("Et lite sammendrag"),
    createSanityBlock("Ekstra info til student", { visFor: ["student"] }),
  ],
};
