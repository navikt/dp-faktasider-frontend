import { Knapp } from "nav-frontend-knapper";
import { Sidetittel } from "nav-frontend-typografi";
import Undertittel from "nav-frontend-typografi/lib/undertittel";
import React, { useState } from "react";
import styled from "styled-components/macro";
import Historikk from "../../components/historikk/Historikk";
import {
  historikkDeltTekstTestdata,
  historikkGBelløpTestdata,
  historikkVisPaaTestdata,
} from "../../components/historikk/historikk.testdata";
import { HistorikkProps } from "./[...slug]";

const testData = [
  {
    name: "delte tekster",
    data: historikkDeltTekstTestdata,
  },
  {
    name: "Grunnbelløp",
    data: historikkGBelløpTestdata,
  },
  {
    name: "visPaaSide",
    data: historikkVisPaaTestdata,
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

function HistorikkTestdata() {
  const [valgtData, setData] = useState<HistorikkProps | undefined>(undefined);

  return (
    <>
      <Style>
        <Sidetittel>Visualisering av testdata brukt i automatiske tester</Sidetittel>
        <Undertittel>Velg testdata:</Undertittel>
        {testData.map((data) => (
          <StyledKnapp key={data.name} onClick={() => setData(data.data)}>
            {data.name}
          </StyledKnapp>
        ))}
      </Style>
      {valgtData && <Historikk {...valgtData} />}
    </>
  );
}

export default HistorikkTestdata;
