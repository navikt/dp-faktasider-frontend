import React, { useReducer } from "react";
import { visForTestData } from "../components/BlockContent/VisFor/visFor.testdata";
import { faktaSideMockQueryData } from "../testUtils/faktaSideMockQueryData";
import styled from "styled-components";
import { flattenH2TestData } from "../utils/richTextUtils/parser/flattenH2Versions/flattenH2Versions.testdata";
import { makeUniqueIdTestData } from "../utils/richTextUtils/parser/makeUniqeGroupIDs/makeUniqeGroupIDs.testdata";
import { parseDelteTeksterTestData } from "../utils/richTextUtils/parser/parseDelteTekster/parseDelteTekster.testdata";
import { groupParserTestData } from "../utils/richTextUtils/parser/groupParser/groupParser.testdata";
import { draftTestdata } from "../components/BlockContent/draft/Draft.testdata";
import TestFaktaside from "../testUtils/TestFaktaside";
import { visPaaSideTestData } from "../components/BlockContent/VisFor/VisPaaSide.testdata";
import { tillegsinformasjonTestData } from "../components/BlockContent/Tilleggsinnformasjon/TilleggsInnformasjon.testdata";
import { groupMarkupTestData } from "../components/BlockContent/GroupMarkup/GroupMarkup.testdata";
import { tidslinjeTestData } from "../components/BlockContent/Tidslinje/Tidslinje.testdata";
import { FaktasideQueryData, IFaktaside } from "../sanity/groq/faktaside/faktasideQuery";
import { translated } from "../testUtils/createSanityBlock";
import { sistOppdatertTestdata } from "../components/faktaside/content/SistOppdatert.testdata";
import { wordCountTestData } from "../../cypress/testData/wordcount.testdata";
import { GtilNOKAnnotationTestdata } from "../components/BlockContent/GtilNOKAnnotation/GtilNOKAnnotation.testdata";
import { Button, Heading } from "@navikt/ds-react";
import { språktestData } from "../testUtils/språk.testdata";

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
    name: "feilmelding",
    data: {
      // @ts-ignore
      innhold: {},
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
      innhold: translated(draftTestdata),
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
    data: sistOppdatertTestdata.faktaside as Partial<IFaktaside>,
  },
  {
    name: "Cypress - word count",
    data: {
      innhold: translated(wordCountTestData.innhold),
      beskrivelse: translated(""),
      visIngenValgPasser: true,
      kortFortalt: translated(wordCountTestData.kortFortalt),
    },
  },
  {
    name: "Cypress - språktest",
    data: { kortFortalt: språktestData, visSprakversjon: { no: true, en: true } },
  },
  {
    name: "GtilNOK",
    data: { innhold: translated(GtilNOKAnnotationTestdata) },
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

const StyledKnapp = styled(Button)`
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
        <Heading size="2xlarge" level="1" spacing>
          Visualisering av testdata brukt i automatiske tester
        </Heading>
        <Heading size="medium" level="2">
          Velg testdata:
        </Heading>
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
