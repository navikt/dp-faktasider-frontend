import parseRichText from '../../../utils/richTextUtils/parser/parseRichText';
import {
  crateSanityListeElement,
  crateSanityListeElementMedVisFor,
  createSanityBlock,
  createSanityBlockMedVisFor,
} from '../../../testUtils/createSanityBlock';

const bolkStudent = 'Bolk som bare vises for student';
const bolkPermittert = 'Bolk som bare vises for permittert';
const bolkForAlle = 'Overskrift som vises for alle';
const innholdStudent = 'Innhold som vises for student';
const innholdPermittert = 'Innhold som vises for permittert';
const innholdForAlle = 'Innhold som vises for alle';

const data = [
  createSanityBlock(bolkForAlle, 'h2'),
  crateSanityListeElement('Bulletpoint som vises for alle'),
  crateSanityListeElementMedVisFor('Bulletpoint som vises for student', { student: true }),
  createSanityBlock(innholdForAlle, 'normal'),
  createSanityBlockMedVisFor(innholdStudent, 'normal', { student: true }),
  createSanityBlockMedVisFor(innholdPermittert, 'normal', { permittert: true }),
  createSanityBlockMedVisFor(bolkStudent, 'h2', { student: true }),
  createSanityBlock('Studentinnhold', 'normal'),
  createSanityBlockMedVisFor(bolkPermittert, 'h2', { permittert: true }),
  createSanityBlock('Permittertinnhold', 'normal'),
];

export const visForTestData = {
  tekster: {
    innholdPermittert,
    innholdStudent,
    innholdForAlle,
    bolkStudent,
    bolkPermittert,
    bolkForAlle,
  },
  innhold: parseRichText(data),
};
