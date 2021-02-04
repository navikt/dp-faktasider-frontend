import { createSanityBlock } from "../../../testUtils/createSanityBlock";

const bolkStudent = "Bolk som bare vises for student";
const bolkPermittert = "Bolk som bare vises for permittert";
const bolkForAlle = "Overskrift som vises for alle";
const innholdStudent = "Innhold som vises for student";
const innholdPermittert = "Innhold som vises for permittert";
const innholdForAlle = "Innhold som vises for alle";
const bolkSkjulForPermittertOgKonkurs = "Bolk som skjules for permittert";

const data = [
  createSanityBlock(bolkForAlle, "h2"),
  createSanityBlock("Bulletpoint som vises for alle", "normal", { listItem: "bullet" }),
  createSanityBlock("Bulletpoint som vises for student", "normal", { listItem: "bullet", visFor: ["student"] }),
  createSanityBlock(innholdForAlle, "normal"),
  createSanityBlock(innholdStudent, "normal", { visFor: ["student"] }),
  createSanityBlock(innholdPermittert, "normal", { visFor: ["permittert"] }),
  createSanityBlock(bolkStudent, "h2", { visFor: ["student"] }),
  createSanityBlock("Studentinnhold", "normal"),
  createSanityBlock(bolkPermittert, "h2", { visFor: ["permittert"] }),
  createSanityBlock("Permittertinnhold", "normal"),
  createSanityBlock(bolkSkjulForPermittertOgKonkurs, "h2", {
    visFor: ["permittert", "konkurs"],
    omvendtFiltrering: true,
  }),
  createSanityBlock("Innhold som skjules for permittert", "normal"),
];

export const visForTestData = {
  tekster: {
    innholdPermittert,
    innholdStudent,
    innholdForAlle,
    bolkStudent,
    bolkPermittert,
    bolkForAlle,
    bolkSkjulForPermittertOgKonkurs,
  },
  innhold: data,
};
