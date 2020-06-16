import * as React from 'react';
import InnholdsListe from './InnholdsListe';
import Filtrering from './Filtrering';
import ErrorBoundary from '../../../components/ErrorBoundary';

function InnholdsMeny(props: React.ComponentProps<typeof InnholdsListe>) {
  if (!props.menuItems.length) {
    return null;
  }

  return (
    <ErrorBoundary boundaryName="Innholdsmeny">
      <InnholdsListe {...props} />
      <Filtrering />
    </ErrorBoundary>
  );
}

export default InnholdsMeny;
