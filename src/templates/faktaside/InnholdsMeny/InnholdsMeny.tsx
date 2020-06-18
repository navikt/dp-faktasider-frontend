import * as React from 'react';
import InnholdsListe from './InnholdsListe';
import Filtrering from './Filtrering';
import ErrorBoundary from '../../../components/ErrorBoundary';
import styled from 'styled-components';

const Style = styled.div`
  margin: 0.5rem 1rem 1rem 2.5rem;
`;

function InnholdsMeny(props: React.ComponentProps<typeof InnholdsListe>) {
  if (!props.menuItems.length) {
    return null;
  }

  return (
    <ErrorBoundary boundaryName="Innholdsmeny">
      <Style>
        <InnholdsListe {...props} />
        <Filtrering />
      </Style>
    </ErrorBoundary>
  );
}

export default InnholdsMeny;
