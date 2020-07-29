import * as React from 'react';
import { useReducer } from 'react';
import { FaktasideContext } from '../../gatsby-utils/createFaktasider';
import { visForTestData } from '../components/BlockContent/VisFor/visFor.testdata';
import { faktaSideMockContext } from '../testUtils/faktaSideMockContext';
import styled from 'styled-components/macro';
import { Sidetittel, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import FaktaSide from './faktaside/FaktaSide';
import parseRichText from '../utils/richTextUtils/parser/parseRichText';
import { flattenH2TestData } from '../utils/richTextUtils/parser/flattenH2Versions/flattenH2Versions.testdata';
import { makeUniqueIdTestData } from '../utils/richTextUtils/parser/makeUniqeGroupIDs/makeUniqeGroupIDs.testdata';
import { parseDelteTeksterTestData } from '../utils/richTextUtils/parser/parseDelteTekster/parseDelteTekster.testdata';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { groupParserTestData } from '../utils/richTextUtils/parser/groupParser/groupParser.testdata';
import { faktasiderSummaryMockData } from '../utils/faktasiderSummary/faktasiderSummaryMockData';
import { utkastTestData } from '../components/BlockContent/utkast/Utkast.testdata';
import { visForAnnotationDeltTekstTestData } from '../components/BlockContent/VisFor/visForAnnotationDeltTekstTestData';

type Testdata = {
  data: Partial<FaktasideContext>;
  name: string;
};

const testData: Testdata[] = [
  {
    name: 'Base',
    data: {},
  },
  {
    name: 'visFor',
    data: {
      innhold: visForTestData.innhold,
    },
  },
  {
    name: 'flattenH2',
    data: {
      innhold: parseRichText(flattenH2TestData),
    },
  },
  {
    name: 'unique IDs',
    data: {
      innhold: parseRichText(makeUniqueIdTestData),
    },
  },
  {
    name: 'parse delte tekster',
    data: {
      innhold: parseRichText(parseDelteTeksterTestData),
    },
  },
  {
    name: 'groupParser',
    data: {
      innhold: parseRichText(groupParserTestData),
    },
  },
  {
    name: 'utkast',
    data: {
      innhold: parseRichText(utkastTestData),
    },
  },
  {
    name: 'visForAnnotation delt tekst',
    data: {
      innhold: visForAnnotationDeltTekstTestData.data,
      id: visForAnnotationDeltTekstTestData.secondPageId,
    },
  },
];

const Style = styled.div`
  text-align: center;
  > * {
    margin-bottom: 1rem;
  }
  padding: 2rem 0 1rem;
  background-color: #ffb8;
  border-bottom: 0.2rem #888 dashed;
`;

const StyledKnapp = styled(Knapp)`
  margin: 0.5rem;
  text-transform: none;
`;

const StyledTekstområde = styled(Tekstomrade)`
  border: 0.2rem #888 solid;
  background-color: #0002;
  padding: 1rem;
  font-family: monospace;
`;

function reducer(
  state: FaktasideContext | undefined,
  action: { type: 'setData'; data: Partial<FaktasideContext> }
): FaktasideContext | undefined {
  switch (action.type) {
    case 'setData':
      return {
        ...faktaSideMockContext,
        project: { summaries: faktasiderSummaryMockData, title: 'Testdata' },
        ...action.data,
      };
    default:
      return state;
  }
}

function VisTestdata() {
  const [valgtData, dispatch] = useReducer(reducer, undefined);

  return (
    <>
      <Style>
        <Sidetittel>Visualisering av testdata brukt i automatiske tester</Sidetittel>
        <Undertittel>Velg testdata:</Undertittel>
        <Normaltekst>
          Ikke all testa blir mocket her, bla vil komponenter med staticQueries (bla Navigasjonsmeny) hente data fra
          sanity og ikke fra lokal mock-data
        </Normaltekst>
        {testData.map((data) => (
          <StyledKnapp key={data.name} onClick={() => dispatch({ type: 'setData', data: data.data })}>
            {data.name}
          </StyledKnapp>
        ))}
      </Style>
      {/* @ts-ignore */}
      {valgtData && <FaktaSide pageContext={valgtData} />}
      {valgtData && (
        <StyledTekstområde>
          {'Page context: \n\n' + JSON.stringify(valgtData, null, 4)?.replace(/ /g, '\u00a0')}
        </StyledTekstområde>
      )}
    </>
  );
}

export default VisTestdata;
