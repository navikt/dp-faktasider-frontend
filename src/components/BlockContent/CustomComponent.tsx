import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

interface Props {
  node: {
    component: string;
  };
}

function CustomComponent(props: Props) {
  switch (props.node.component) {
    case 'Test komponent':
      return <div>Uferdig komponent</div>;
    default:
      return <AlertStripeFeil>Ukjent komponent: "{props.node.component}"</AlertStripeFeil>;
  }
}

export default CustomComponent;
