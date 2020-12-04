import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import {
  crateSanityListeElement,
  crateSanityListeElementMedVisFor,
  createSanityBlock,
  createSanityBlockMedVisFor,
} from "../../../testUtils/createSanityBlock";

const bolkStudent = "Bolk som bare vises for student";
const bolkPermittert = "Bolk som bare vises for permittert";
const bolkForAlle = "Overskrift som vises for alle";
const innholdStudent = "Innhold som vises for student";
const innholdPermittert = "Innhold som vises for permittert";
const innholdForAlle = "Innhold som vises for alle";
const bolkSkjulForPermittertOgKonkurs = "Bolk som skjules for permittert";

const data = [
  createSanityBlock(bolkForAlle, "h2"),
  crateSanityListeElement("Bulletpoint som vises for alle"),
  crateSanityListeElementMedVisFor("Bulletpoint som vises for student", ["student"]),
  createSanityBlock(innholdForAlle, "normal"),
  createSanityBlockMedVisFor(innholdStudent, "normal", ["student"]),
  createSanityBlockMedVisFor(innholdPermittert, "normal", ["permittert"]),
  createSanityBlockMedVisFor(bolkStudent, "h2", ["student"]),
  createSanityBlock("Studentinnhold", "normal"),
  createSanityBlockMedVisFor(bolkPermittert, "h2", ["permittert"]),
  createSanityBlock("Permittertinnhold", "normal"),
  createSanityBlockMedVisFor(bolkSkjulForPermittertOgKonkurs, "h2", ["permittert", "konkurs"], true),
  createSanityBlockMedVisFor("Innhold som skjules for permittert", "normal"),
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
  innhold: parseRichText(data),
};
