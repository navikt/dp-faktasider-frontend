import * as React from 'react';

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
      return <div>Ukjent komponent: "{props.node.component}"</div>;
  }
}

export default CustomComponent;
