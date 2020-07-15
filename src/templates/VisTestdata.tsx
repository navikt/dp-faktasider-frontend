import * as React from 'react';
import { FaktasideContext } from '../../gatsby-utils/createFaktasider';
import { visForTestData } from '../components/BlockContent/VisFor/visFor.testdata';
import { faktaSideMockContext } from '../testUtils/faktaSideMockContext';
import styled from 'styled-components';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import FaktaSide from './faktaside/FaktaSide';

type Testdata = {
  data: FaktasideContext;
  name: string;
};

const testData: Testdata[] = [
  {
    name: 'visFor',
    data: {
      ...faktaSideMockContext,
      innhold: visForTestData.innhold,
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

function VisTestdata() {
  const [valgtData, setValgtData] = useState<undefined | FaktasideContext>();

  return (
    <>
      <Style>
        <Sidetittel>Visualisering av testdata brukt i automatiske tester</Sidetittel>
        <Undertittel>Velg testdata:</Undertittel>
        {testData.map((data) => (
          <Knapp key={data.name} onClick={() => setValgtData(data.data)}>
            {data.name}
          </Knapp>
        ))}
      </Style>
      {/* @ts-ignore */}
      {valgtData && <FaktaSide pageContext={valgtData} />}
    </>
  );
}

export default VisTestdata;
