import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import DagpengerKalkulator from '../HvorMyeKalkulator/DagpengerKalkulator';

interface Props {
  node: {
    komponent: string;
  };
}

function CustomComponent(props: Props) {
  switch (props.node.komponent) {
    case 'DagpengeKalkulator - normal':
      return <DagpengerKalkulator />;
    default:
      return <AlertStripeFeil>Ukjent komponent: "{props.node.komponent}"</AlertStripeFeil>;
  }
}

export default CustomComponent;
