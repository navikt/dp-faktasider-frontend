import * as React from 'react';
import InnholdsListe from './InnholdsListe';
import Filtrering from './Filtrering';
import styled from 'styled-components';
import { useInnholdsListe } from './useInnholdsListe';
import withErrorBoundary from '../../../components/withErrorBoundary';

const Style = styled.div`
  margin: 0.5rem 1rem 1rem 2.5rem;
`;

function InnholdsMeny() {
  const innholdsListe = useInnholdsListe();
  if (!innholdsListe.length) {
    return null;
  }

  return (
    <Style>
      <InnholdsListe />
      <Filtrering />
    </Style>
  );
}

export default withErrorBoundary(InnholdsMeny);
