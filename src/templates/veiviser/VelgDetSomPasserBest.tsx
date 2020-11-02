import * as React from 'react';
import styled from 'styled-components/macro';
import Lenkepanel from 'nav-frontend-lenkepanel';

const Style = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  max-width: 40rem;
  margin: 3rem auto;
  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  h2 {
    text-align: center;
    margin-bottom: 2rem !important;
  }
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
      {props.valg.map((valg) => (
        <Lenkepanel border tittelProps={'element'} href={'#'} onClick={() => props.setValg(valg.object)}>
          {valg.label}
        </Lenkepanel>
      ))}
    </Style>
  );
}

export default VelgDetSomPasserBest;
