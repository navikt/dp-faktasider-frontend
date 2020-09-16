import * as React from 'react';
import styled from 'styled-components/macro';
import { Knapp } from 'nav-frontend-knapper';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30rem;
  margin: 2rem auto;
  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  h2 {
    text-align: center;
    margin-bottom: 2rem !important;
  }
`;

const StyledKnapp = styled(Knapp)`
  white-space: normal !important;
`;

export type VeiviserValg<Type> = {
  label: string;
  id: string;
  object: Type;
};

interface Props<Type> {
  valg: VeiviserValg<Type>[];
  setValg: (id: Type) => void;
}

function VelgDetSomPasserBest<Type>(props: Props<Type>) {
  return (
    <Style>
      <h2>Velg det som passer best:</h2>
      {props.valg.map((valg) => (
        <StyledKnapp type={'flat'} onClick={() => props.setValg(valg.object)}>
          {valg.label}
        </StyledKnapp>
      ))}
    </Style>
  );
}

export default VelgDetSomPasserBest;
