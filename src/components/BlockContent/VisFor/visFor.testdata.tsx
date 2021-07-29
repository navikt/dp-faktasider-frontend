import { createSanityBlock } from "../../../testUtils/createSanityBlock";
import { VisForSituasjon } from "./VisFor";

const bolkStudent = "Bolk som bare vises for student";
const bolkPermittert = "Bolk som bare vises for permittert";
const bolkForAlle = "Overskrift som vises for alle";
const innholdStudent = "Innhold som vises for student";
const innholdPermittert = "Innhold som vises for permittert";
const innholdForAlle = "Innhold som vises for alle";
const bolkSkjulForPermittertOgKonkurs = "Bolk som skjules for permittert";

const data = [
  createSanityBlock(bolkForAlle, { style: "h2" }),
  createSanityBlock("Bulletpoint som vises for alle", { listItem: "bullet" }),
  createSanityBlock("Bulletpoint som vises for student", { listItem: "bullet", visFor: ["stud-id"] }),
  createSanityBlock(innholdForAlle),
  createSanityBlock(innholdStudent, { visFor: ["stud-id"] }),
  createSanityBlock(innholdPermittert, { visFor: ["perm-id"] }),
  createSanityBlock(bolkStudent, { style: "h2", visFor: ["stud-id"] }),
  createSanityBlock("Studentinnhold"),
  createSanityBlock(bolkPermittert, { style: "h2", visFor: ["perm-id"] }),
  createSanityBlock("Permittertinnhold"),
  createSanityBlock(bolkSkjulForPermittertOgKonkurs, {
    style: "h2",
    visFor: ["perm-id", "konk-id"],
    omvendtFiltrering: true,
  }),
  createSanityBlock("Innhold som skjules for permittert"),
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

export const mockVisForKonverteringstabell: VisForSituasjon[] = [
  {
    name: "Student",
    _id: "stud-id",
  },
  {
    name: "Permittert",
    _id: "perm-id",
  },
  {
    name: "Konkurs",
    _id: "konk-id",
  },
];
