/*
* Testdataen er visualisert under localhost:8000/testdata
*
* Hentet ut vha grapql spørring:
* query MyQuery {
  allSanityFaktaSide(filter: {id: {eq: "-af2e15a0-d8c7-5402-8487-964431592a70"}}) {
    nodes {
      innhold: _rawInnhold(resolveReferences: {maxDepth: 13})
    }
  }
}
* */

import localizeSanityContent from '../../../i18n/localizeSanityContent';
import parseRichText from '../../../utils/richTextUtils/parser/parseRichText';

const visForAnnotationDeltTekstRawTestData = [
  {
    _key: 'b599c3391a57',
    _type: 'deltTekstReference',
    deltTekst: {
      _id: 'drafts.c8323f4d-4050-4dc8-a252-372d24d6a72c',
      _type: 'deltTekst',
      _rev: 'pbjf5g-nyy-g1x-mvk-n06r87jc9',
      _createdAt: '2020-07-22T06:04:31Z',
      _updatedAt: '2020-07-22T07:17:03Z',
      innhold: {
        _type: 'localeDeltRichText',
        no: [
          {
            _key: 'd68b9a7b4c75',
            _type: 'block',
            children: [
              {
                _key: 'd68b9a7b4c750',
                _type: 'span',
                marks: [],
                text: 'Overskrift fra delt tekst',
              },
            ],
            markDefs: [],
            style: 'h2',
          },
          {
            _key: '64917ebd9cb0',
            _type: 'block',
            children: [
              {
                _key: '64917ebd9cb00',
                _type: 'span',
                marks: [],
                text: '',
              },
              {
                _key: '64917ebd9cb01',
                _type: 'span',
                marks: ['6773681b81a6'],
                text: 'Vis for side nummer 1 ',
              },
              {
                _key: '64917ebd9cb02',
                _type: 'span',
                marks: [],
                text: '',
              },
            ],
            markDefs: [
              {
                _key: '6773681b81a6',
                _type: 'visForAnnotationDeltTekst',
                visPaaSider: [
                  {
                    _id: '1fe6cfcd-0928-46ae-80ba-aedbc38fb558',
                    _type: 'faktaSide',
                    _rev: 'UP5DN8kgH0KgNaQFvnxHYX',
                    _createdAt: '2020-07-22T06:02:34Z',
                    _updatedAt: '2020-07-22T06:04:54Z',
                    innhold: {
                      _type: 'localeRichText',
                      no: [
                        {
                          _key: 'b599c3391a57',
                          _type: 'deltTekstReference',
                          deltTekst: {
                            _ref: 'c8323f4d-4050-4dc8-a252-372d24d6a72c',
                            _type: 'reference',
                          },
                        },
                      ],
                    },
                    slug: {
                      _type: 'slug',
                      current: 'delte-tekster-test',
                    },
                    title: {
                      _type: 'localeString',
                      no: 'Delte tekster test',
                    },
                    visSprakversjon: {
                      _type: 'visSprakversjon',
                      no: true,
                    },
                    id: '-af2e15a0-d8c7-5402-8487-964431592a70',
                    parent: null,
                    children: [],
                    internal: {
                      type: 'SanityFaktaSide',
                      contentDigest: 'edf8526b9206d70ffc3060a5f5ce56c7',
                      counter: 31,
                      owner: 'gatsby-source-sanity',
                    },
                  },
                ],
              },
            ],
            style: 'normal',
          },
          {
            _key: 'a35744750603',
            _type: 'block',
            children: [
              {
                _key: 'a357447506030',
                _type: 'span',
                marks: [],
                text: '',
              },
              {
                _key: 'a357447506031',
                _type: 'span',
                marks: ['7c151db77289'],
                text: 'Bulletpoint side 1',
              },
              {
                _key: 'a357447506032',
                _type: 'span',
                marks: [],
                text: '',
              },
            ],
            level: 1,
            listItem: 'bullet',
            markDefs: [
              {
                _key: '7c151db77289',
                _type: 'visForAnnotationDeltTekst',
                visPaaSider: [
                  {
                    _id: '1fe6cfcd-0928-46ae-80ba-aedbc38fb558',
                    _type: 'faktaSide',
                    _rev: 'UP5DN8kgH0KgNaQFvnxHYX',
                    _createdAt: '2020-07-22T06:02:34Z',
                    _updatedAt: '2020-07-22T06:04:54Z',
                    innhold: {
                      _type: 'localeRichText',
                      no: [
                        {
                          _key: 'b599c3391a57',
                          _type: 'deltTekstReference',
                          deltTekst: {
                            _ref: 'c8323f4d-4050-4dc8-a252-372d24d6a72c',
                            _type: 'reference',
                          },
                        },
                      ],
                    },
                    slug: {
                      _type: 'slug',
                      current: 'delte-tekster-test',
                    },
                    title: {
                      _type: 'localeString',
                      no: 'Delte tekster test',
                    },
                    visSprakversjon: {
                      _type: 'visSprakversjon',
                      no: true,
                    },
                    id: '-af2e15a0-d8c7-5402-8487-964431592a70',
                    parent: null,
                    children: [],
                    internal: {
                      type: 'SanityFaktaSide',
                      contentDigest: 'edf8526b9206d70ffc3060a5f5ce56c7',
                      counter: 31,
                      owner: 'gatsby-source-sanity',
                    },
                  },
                ],
              },
            ],
            style: 'normal',
          },
          {
            _key: 'f9a6f9a73461',
            _type: 'block',
            children: [
              {
                _key: 'f9a6f9a734610',
                _type: 'span',
                marks: [],
                text: '',
              },
              {
                _key: 'f9a6f9a734611',
                _type: 'span',
                marks: ['c5aaaad1bf67'],
                text: 'Vis for side nummer 2',
              },
              {
                _key: 'f9a6f9a734612',
                _type: 'span',
                marks: [],
                text: '',
              },
            ],
            markDefs: [
              {
                _key: 'c5aaaad1bf67',
                _type: 'visForAnnotationDeltTekst',
                visPaaSider: [
                  {
                    _id: '5c1b1779-b8f1-41e0-9f42-69acc4ac7287',
                    _type: 'faktaSide',
                    _rev: 'UP5DN8kgH0KgNaQFvno5gD',
                    _createdAt: '2020-07-06T11:00:56Z',
                    _updatedAt: '2020-07-21T14:48:39Z',
                    beskrivelse: {
                      _type: 'localeText',
                      no: 'Dette er en testside',
                    },
                    innhold: {
                      _type: 'localeRichText',
                      no: [
                        {
                          _key: 'b976ca1cd68b',
                          _type: 'fremhevetTekst',
                          innhold: [
                            {
                              _key: 'a4a60e714ab1',
                              _type: 'block',
                              children: [
                                {
                                  _key: 'a4a60e714ab10',
                                  _type: 'span',
                                  marks: [],
                                  text: 'Hei på degsann',
                                },
                              ],
                              markDefs: [],
                              style: 'normal',
                            },
                          ],
                        },
                        {
                          _key: '47a157de6aeb',
                          _type: 'block',
                          children: [
                            {
                              _key: '47a157de6aeb0',
                              _type: 'span',
                              marks: [],
                              text: '',
                            },
                            {
                              _key: '47a157de6aeb1',
                              _type: 'span',
                              marks: ['e5fd1ac28695'],
                              text: 'Bare for student',
                            },
                            {
                              _key: '47a157de6aeb2',
                              _type: 'span',
                              marks: [],
                              text: '',
                            },
                          ],
                          markDefs: [
                            {
                              _key: 'e5fd1ac28695',
                              _type: 'visForAnnotation',
                              visFor: {
                                Frilanser: false,
                                Student: true,
                                _type: 'visFor',
                              },
                            },
                          ],
                          style: 'normal',
                        },
                        {
                          _key: 'e54bc8422c6b',
                          _type: 'deltTekstReference',
                          deltTekst: {
                            _ref: '1b24792f-8ec2-4d4c-a072-11c611d73455',
                            _type: 'reference',
                          },
                        },
                      ],
                    },
                    slug: {
                      _type: 'slug',
                      current: 'faktaside-1',
                    },
                    title: {
                      _type: 'localeString',
                      no: 'Faktaside 1',
                    },
                    visSprakversjon: {
                      _type: 'visSprakversjon',
                      no: true,
                    },
                    id: '-4c12238e-6387-5b05-ac3e-0f091a6c8631',
                    parent: null,
                    children: [],
                    internal: {
                      type: 'SanityFaktaSide',
                      contentDigest: '9038373a8abf4d85e893329d75cb1ab2',
                      counter: 34,
                      owner: 'gatsby-source-sanity',
                    },
                  },
                ],
              },
            ],
            style: 'normal',
          },
          {
            _key: '033736488207',
            _type: 'block',
            children: [
              {
                _key: '0337364882070',
                _type: 'span',
                marks: [],
                text: 'Overskrift før fremhevet tekst i delt tekst',
              },
            ],
            markDefs: [],
            style: 'h2',
          },
          {
            _key: '4536ae2339fb',
            _type: 'deltFremhevetTekst',
            innhold: [
              {
                _key: '4c7a3bd66186',
                _type: 'block',
                children: [
                  {
                    _key: '4c7a3bd661860',
                    _type: 'span',
                    marks: [],
                    text: 'Fremhevet tekst',
                  },
                ],
                markDefs: [],
                style: 'normal',
              },
              {
                _key: '07fe85e08426',
                _type: 'block',
                children: [
                  {
                    _key: '07fe85e084260',
                    _type: 'span',
                    marks: [],
                    text: '',
                  },
                  {
                    _key: '07fe85e084261',
                    _type: 'span',
                    marks: ['ada998e57df2'],
                    text: 'Vises for student',
                  },
                  {
                    _key: '07fe85e084262',
                    _type: 'span',
                    marks: [],
                    text: '',
                  },
                ],
                markDefs: [
                  {
                    _key: 'ada998e57df2',
                    _type: 'visForAnnotationDeltTekst',
                    visFor: {
                      Student: true,
                      _type: 'visFor',
                    },
                  },
                ],
                style: 'normal',
              },
              {
                _key: 'bf469a398e6e',
                _type: 'block',
                children: [
                  {
                    _key: 'bf469a398e6e0',
                    _type: 'span',
                    marks: [],
                    text: '',
                  },
                  {
                    _key: 'bf469a398e6e1',
                    _type: 'span',
                    marks: ['d46e9f0918b7'],
                    text: 'Bulletpoint som vises for student',
                  },
                  {
                    _key: 'bf469a398e6e2',
                    _type: 'span',
                    marks: [],
                    text: '',
                  },
                ],
                level: 1,
                listItem: 'bullet',
                markDefs: [
                  {
                    _key: 'd46e9f0918b7',
                    _type: 'visForAnnotationDeltTekst',
                    visFor: {
                      Student: true,
                      _type: 'visFor',
                    },
                  },
                ],
                style: 'normal',
              },
              {
                _key: '070c662f79f5',
                _type: 'block',
                children: [
                  {
                    _key: '070c662f79f50',
                    _type: 'span',
                    marks: [],
                    text: '',
                  },
                  {
                    _key: '070c662f79f51',
                    _type: 'span',
                    marks: ['ac0fae396054'],
                    text: 'Vises for permittert',
                  },
                  {
                    _key: '070c662f79f52',
                    _type: 'span',
                    marks: [],
                    text: '',
                  },
                ],
                markDefs: [
                  {
                    _key: 'ac0fae396054',
                    _type: 'visForAnnotationDeltTekst',
                    visFor: {
                      Permittert: true,
                      _type: 'visFor',
                    },
                  },
                ],
                style: 'normal',
              },
            ],
          },
        ],
      },
      title: 'Test delt tekst',
      id: '-02949455-865b-5f39-a35b-ecdf7bc7ca8a',
      parent: null,
      children: [],
      internal: {
        type: 'SanityDeltTekst',
        contentDigest: 'fec9be4e314e833b37d9694593f48be3',
        counter: 48,
        owner: 'gatsby-source-sanity',
      },
    },
  },
];

export const visForAnnotationDeltTekstTestData = {
  data: parseRichText(localizeSanityContent(visForAnnotationDeltTekstRawTestData, 'no')),
  firstPageId: '-af2e15a0-d8c7-5402-8487-964431592a70',
  secondPageId: '-4c12238e-6387-5b05-ac3e-0f091a6c8631',
};
