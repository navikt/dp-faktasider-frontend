import { FaktasideQueryData } from "../src/hooks/groq/fetchFaktaside";

export const rawFaktasideDataMock = {
  id: "-b182d79a-6d0b-5652-8812-887910f218ee",
  _updatedAt: "2020-07-10T10:54:03Z",
  innhold: {
    _type: "localeRichText",
    en: [
      {
        _key: "0b3aa3c4664f",
        _type: "block",
        children: [
          {
            _key: "0b3aa3c4664f0",
            _type: "span",
            marks: [],
            text: "Heading",
          },
        ],
        markDefs: [],
        style: "h2",
      },
      {
        _key: "727090fa9168",
        _type: "block",
        children: [
          {
            _key: "727090fa91680",
            _type: "span",
            marks: [],
            text: "Some content",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _key: "3e76eb58314b",
        _type: "block",
        children: [
          {
            _key: "3e76eb58314b0",
            _type: "span",
            marks: [],
            text: "Punkt 1",
          },
        ],
        level: 1,
        listItem: "bullet",
        markDefs: [],
        style: "normal",
      },
      {
        _key: "349a16a05024",
        _type: "block",
        children: [
          {
            _key: "349a16a050240",
            _type: "span",
            marks: [],
            text: "Punkt 2",
          },
        ],
        level: 1,
        listItem: "bullet",
        markDefs: [],
        style: "normal",
      },
    ],
    no: [
      {
        _key: "175dd64153b5",
        _type: "block",
        children: [
          {
            _key: "175dd64153b50",
            _type: "span",
            marks: [],
            text: "Overskrift",
          },
        ],
        markDefs: [],
        style: "h2",
      },
      {
        _key: "017ecd04127e",
        _type: "block",
        children: [
          {
            _key: "017ecd04127e0",
            _type: "span",
            marks: [],
            text: "Litt innhold",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _key: "c91e0bcf3131",
        _type: "block",
        children: [
          {
            _key: "c91e0bcf31310",
            _type: "span",
            marks: [],
            text: "Punkt 1",
          },
        ],
        level: 1,
        listItem: "bullet",
        markDefs: [],
        style: "normal",
      },
      {
        _key: "c25a5720548f",
        _type: "block",
        children: [
          {
            _key: "c25a5720548f0",
            _type: "span",
            marks: [],
            text: "Punkt 2",
          },
        ],
        level: 1,
        listItem: "bullet",
        markDefs: [],
        style: "normal",
      },
    ],
  },
  title: {
    _type: "localeString",
    en: "This is some test data",
    no: "Dette er litt testdata",
  },
  beskrivelse: {
    _type: "localeText",
    en: "This is used for testing",
    no: "Denne brukes i test",
  },
  relatertInformasjon: {
    _type: "localeRelatertInformasjonRichText",
    en: [
      {
        _key: "1c281ff3773e",
        _type: "block",
        children: [
          {
            _key: "1c281ff3773e0",
            _type: "span",
            marks: [],
            text: "Some other information",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    no: [
      {
        _key: "57366733aa32",
        _type: "block",
        children: [
          {
            _key: "57366733aa320",
            _type: "span",
            marks: [],
            text: "Relatert info",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
  },
  slug: {
    current: "dette-er-litt-testdata",
  },
  visSprakversjon: {
    en: true,
    no: true,
  },
} as RawFaktasideData;
