import { SanityBlock } from '../../../utils/richTextUtils/richTextTypes';
import { crateSanityListeElement, createSanityBlock } from '../../../testUtils/createSanityBlock';

export const utkastTestData = [
  crateSanityListeElement('Utkast i bulletpointliste', ['utkast']),
  crateSanityListeElement('Litt tekst'),
  createSanityBlock('Frittstående utkast', 'normal', ['utkast']),
  createSanityBlock('Frittstående tekst', 'normal'),
  createSanityBlock('Overskrift utkast', 'h2', ['utkast']),
  createSanityBlock('Påfølgende innhold', 'normal'),
] as SanityBlock[];
