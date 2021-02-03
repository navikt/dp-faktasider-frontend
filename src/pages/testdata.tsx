import * as React from "react";
import { useReducer } from "react";
import { visForTestData } from "../components/BlockContent/VisFor/visFor.testdata";
import { faktaSideMockContext } from "../testUtils/faktaSideMockContext";
import styled from "styled-components/macro";
import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import { Knapp } from "nav-frontend-knapper";
import parseRichText from "../utils/richTextUtils/parser/parseRichText";
import { flattenH2TestData } from "../utils/richTextUtils/parser/flattenH2Versions/flattenH2Versions.testdata";
import { makeUniqueIdTestData } from "../utils/richTextUtils/parser/makeUniqeGroupIDs/makeUniqeGroupIDs.testdata";
import { parseDelteTeksterTestData } from "../utils/richTextUtils/parser/parseDelteTekster/parseDelteTekster.testdata";
import { groupParserTestData } from "../utils/richTextUtils/parser/groupParser/groupParser.testdata";
import { utkastTestData } from "../components/BlockContent/utkast/Utkast.testdata";
import { visForAnnotationDeltTekstTestData } from "../components/BlockContent/VisFor/visForAnnotationDeltTekstTestData";
import TestFaktaside from "../testUtils/TestFaktaside";
import { visPaaSideTestData } from "../components/BlockContent/VisFor/VisPaaSide.testdata";
import { tillegsinformasjonTestData } from "../components/BlockContent/Tilleggsinnformasjon/TilleggsInnformasjon.testdata";
import { groupMarkupTestData } from "../components/BlockContent/GroupMarkup/GroupMarkup.testdata";
import { tidslinjeTestData } from "../components/BlockContent/Tidslinje/Tidslinje.testdata";
import { FaktasideProps } from "../components/faktaside/Faktaside";

type Testdata = {
  data: Partial<FaktasideProps>;
  name: string;
};

const testData: Testdata[] = [
  {
    name: "Base",
    data: {},
  },
  {
    name: "visFor",
    data: {
      innhold: visForTestData.innhold,
      visIngenValgPasser: true,
    },
  },
  {
    name: "flattenH2",
    data: {
      innhold: parseRichText(flattenH2TestData),
    },
  },
  {
    name: "unique IDs",
    data: {
      innhold: parseRichText(makeUniqueIdTestData),
    },
  },
  {
    name: "parse delte tekster",
    data: {
      innhold: parseRichText(parseDelteTeksterTestData),
    },
  },
  {
    name: "groupParser",
    data: {
      innhold: parseRichText(groupParserTestData),
    },
  },
  {
    name: "group markup",
    data: {
      innhold: groupMarkupTestData,
    },
  },
  {
    name: "utkast",
    data: {
      innhold: parseRichText(utkastTestData),
    },
  },
  {
    name: "visForAnnotation delt tekst",
    data: {
      innhold: visForAnnotationDeltTekstTestData.data,
      id: visForAnnotationDeltTekstTestData.secondPageId,
    },
  },
  {
    name: "visPaaSide delt tekst",
    data: {
      innhold: visPaaSideTestData.innhold,
      id: visPaaSideTestData.id,
    },
  },
  {
    name: "tillegsinformasjon",
    data: {
      innhold: tillegsinformasjonTestData,
    },
  },
  {
    name: "tidslinje",
    data: {
      innhold: tidslinjeTestData,
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

const StyledPre = styled.pre`
  border: 0.2rem #888 solid;
  background-color: #0002;
  padding: 1rem;
  font-family: monospace;
`;

function reducer(
  state: FaktasideProps | undefined,
  action: { type: "setData"; data: Partial<FaktasideProps> }
): FaktasideProps | undefined {
  switch (action.type) {
    case "setData":
      return {
        ...faktaSideMockContext,
        ...action.data,
      };
    default:
      return state;
  }
}

function Testdata() {
  const [valgtData, dispatch] = useReducer(reducer, undefined);

  return (
    <>
      <Style>
        <Sidetittel>Visualisering av testdata brukt i automatiske tester</Sidetittel>
        <Undertittel>Velg testdata:</Undertittel>
        <Normaltekst>
          Ikke all data her blir mocket, komponenter som bruker staticQuery er litt vanskelig å mocke run-time, men
          navigasjonsmenyen har blitt mocket med en test-provider.
        </Normaltekst>
        {testData.map((data) => (
          <StyledKnapp key={data.name} onClick={() => dispatch({ type: "setData", data: data.data })}>
            {data.name}
          </StyledKnapp>
        ))}
      </Style>
      {valgtData && <TestFaktaside partialContext={valgtData} />}
      {valgtData && <StyledPre>{"Page context: \n\n" + JSON.stringify(valgtData, null, 2)}</StyledPre>}
    </>
  );
}

export default Testdata;
