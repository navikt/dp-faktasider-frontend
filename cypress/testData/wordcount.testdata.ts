import { createSanityBlock } from "../../src/testUtils/createSanityBlock";

export const wordCountTestData = {
  innhold: [
    createSanityBlock("Overskrift", { style: "h2" }),
    createSanityBlock("Bulletpoint", { listItem: "bullet" }),
    createSanityBlock("Bulletpoint til student", { listItem: "bullet", visFor: ["stud-id"] }),
    createSanityBlock("Ord til alle"),
    createSanityBlock("Fire ord til student", { visFor: ["stud-id"] }),
    createSanityBlock("Fire ord til permittert", { visFor: ["perm-id"] }),
    createSanityBlock("Bolk til student", { style: "h2", visFor: ["stud-id"] }),
    createSanityBlock("Studentinnhold"),
    createSanityBlock("Bolk til permittert", { style: "h2", visFor: ["perm-id"] }),
    createSanityBlock("Permittertinnhold"),
    createSanityBlock("Bolk som skjules for permittert og konkurs", {
      style: "h2",
      visFor: ["perm-id", "konk-id"],
      omvendtFiltrering: true,
    }),
    createSanityBlock("Innhold som skjules for permittert og konkurs"),
  ],
  kortFortalt: [
    createSanityBlock("Et lite sammendrag"),
    createSanityBlock("Ekstra info til student", { visFor: ["stud-id"] }),
  ],
};
