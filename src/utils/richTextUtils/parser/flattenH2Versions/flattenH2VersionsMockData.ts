import { SanityBlock } from '../../richTextTypes';

export const flattenH2VersionsMockData = [
  {
    _type: 'block',
    _key: '175dd64153b5',
    style: 'h2',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: '175dd64153b50',
        text: 'Vanlig overskrift',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: '7cc05e571a7c',
    style: 'h2-no-background',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: '7cc05e571a7c0',
        text: 'Overskrift uten bakgrunn',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'b4b7e0183c91',
    style: 'h2-m-meny',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'b4b7e0183c910',
        text: 'Overskrift med meny',
        marks: [],
      },
    ],
  },
  {
    _type: 'block',
    _key: 'bd14e6c28d92',
    style: 'h3',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'bd14e6c28d920',
        text: 'Menypunkt',
        marks: [],
      },
    ],
  },
] as SanityBlock[];
