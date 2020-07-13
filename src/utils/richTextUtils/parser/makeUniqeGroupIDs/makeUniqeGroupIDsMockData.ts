import { SanityBlock } from '../../richTextTypes';

const duplikatOverskrift = 'Duplikat overskrift';
export const makeUniqeGroupIDsMockData = [
  {
    _type: 'block',
    _key: '175dd64153b5',
    style: 'h2',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: '175dd64153b50',
        text: 'Unik overskrift',
        marks: [],
      },
    ],
  },
  {
    style: 'h3',
    _key: 'cc956ff02115',
    _type: 'block',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'cc956ff021150',
        text: duplikatOverskrift,
        marks: [],
      },
    ],
  },
  {
    style: 'normal',
    _key: '7cc05e571a7c',
    _type: 'block',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: '7cc05e571a7c0',
        text: 'Innhold 1',
        marks: [],
      },
    ],
  },
  {
    style: 'h2',
    _key: 'b4b7e0183c91',
    _type: 'block',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'b4b7e0183c910',
        text: duplikatOverskrift,
        marks: [],
      },
    ],
  },
  {
    _key: 'bd14e6c28d92',
    _type: 'block',
    children: [
      {
        _key: 'bd14e6c28d920',
        _type: 'span',
        marks: [],
        text: 'Innhold 2',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
] as SanityBlock[];
