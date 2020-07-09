import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import DagpengerKalkulator from '../HvorMyeKalkulator/DagpengerKalkulator';
import DagpengerKalkulatorLRling from '../HvorMyeKalkulator/DagpengerKalkulatorLærling';
import withErrorBoundary from '../withErrorBoundary';

interface Props {
  node: {
    komponent: string;
  };
}

function CustomComponent(props: Props) {
  switch (props.node.komponent) {
    case 'DagpengeKalkulator - normal':
      return <DagpengerKalkulator />;
    case 'DagpengeKalkulator - lærling':
      return <DagpengerKalkulatorLRling />;
    default:
      return <AlertStripeFeil>Ukjent komponent: "{props.node.komponent}"</AlertStripeFeil>;
  }
}

export default withErrorBoundary(CustomComponent);
