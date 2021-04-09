import * as React from "react";
import { useReducer } from "react";
import { visForTestData } from "../components/BlockContent/VisFor/visFor.testdata";
import { faktaSideMockQueryData } from "../testUtils/faktaSideMockQueryData";
import styled from "styled-components/macro";
import { Sidetittel, Undertittel } from "nav-frontend-typografi";
import { Knapp } from "nav-frontend-knapper";
import { flattenH2TestData } from "../utils/richTextUtils/parser/flattenH2Versions/flattenH2Versions.testdata";
import { makeUniqueIdTestData } from "../utils/richTextUtils/parser/makeUniqeGroupIDs/makeUniqeGroupIDs.testdata";
import { parseDelteTeksterTestData } from "../utils/richTextUtils/parser/parseDelteTekster/parseDelteTekster.testdata";
import { groupParserTestData } from "../utils/richTextUtils/parser/groupParser/groupParser.testdata";
import { utkastTestData } from "../components/BlockContent/utkast/Utkast.testdata";
import TestFaktaside from "../testUtils/TestFaktaside";
import { visPaaSideTestData } from "../components/BlockContent/VisFor/VisPaaSide.testdata";
import { tillegsinformasjonTestData } from "../components/BlockContent/Tilleggsinnformasjon/TilleggsInnformasjon.testdata";
import { groupMarkupTestData } from "../components/BlockContent/GroupMarkup/GroupMarkup.testdata";
import { tidslinjeTestData } from "../components/BlockContent/Tidslinje/Tidslinje.testdata";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { translated } from "../testUtils/createSanityBlock";
import { sistOppdatertTestdata } from "../components/faktaside/content/SistOppdatert.testdata";
import { wordCountTestData } from "../../cypress/testData/wordcount.testdata";

type FaktasideData = FaktasideQueryData["faktaside"];

type Testdata = {
  data: Partial<FaktasideData>;
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
      innhold: translated(visForTestData.innhold),
      visIngenValgPasser: true,
    },
  },
  {
    name: "flattenH2",
    data: {
      innhold: translated(flattenH2TestData),
    },
  },
  {
    name: "unique IDs",
    data: {
      innhold: translated(makeUniqueIdTestData),
    },
  },
  {
    name: "parse delte tekster",
    data: {
      innhold: translated(parseDelteTeksterTestData),
    },
  },
  {
    name: "groupParser",
    data: {
      innhold: translated(groupParserTestData),
    },
  },
  {
    name: "group markup",
    data: {
      innhold: translated(groupMarkupTestData),
    },
  },
  {
    name: "utkast",
    data: {
      innhold: translated(utkastTestData),
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
      innhold: translated(tillegsinformasjonTestData),
    },
  },
  {
    name: "tidslinje",
    data: {
      innhold: translated(tidslinjeTestData),
    },
  },
  {
    name: "sist oppdatert",
    data: sistOppdatertTestdata.faktaside,
  },
  {
    name: "Cypress - word count",
    data: { innhold: translated(wordCountTestData.innhold), kortFortalt: translated(wordCountTestData.kortFortalt) },
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
  state: FaktasideData | undefined,
  action: { type: "setData"; data: Partial<FaktasideData> }
): FaktasideData | undefined {
  switch (action.type) {
    case "setData":
      return {
        ...faktaSideMockQueryData.faktaside,
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
        {testData.map((data) => (
          <StyledKnapp key={data.name} onClick={() => dispatch({ type: "setData", data: data.data })}>
            {data.name}
          </StyledKnapp>
        ))}
      </Style>
      {valgtData && <TestFaktaside partialFaktaside={valgtData} />}
      {valgtData && <StyledPre>{"FaktasideProps: \n\n" + JSON.stringify(valgtData, null, 2)}</StyledPre>}
    </>
  );
}

export default Testdata;
