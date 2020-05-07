import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import DagpengerKalkulator from '../HvorMyeKalkulator/DagpengerKalkulator';

interface Props {
  node: {
    component: string;
  };
}

function CustomComponent(props: Props) {
  switch (props.node.component) {
    case 'DagpengeKalkulator - normal':
      return <DagpengerKalkulator />;
    default:
      return <AlertStripeFeil>Ukjent komponent: "{props.node.component}"</AlertStripeFeil>;
  }
}

export default CustomComponent;
