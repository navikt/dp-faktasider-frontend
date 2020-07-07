import * as React from 'react';
import { ReactNode } from 'react';
import { useDevContext } from '../../DevKnapper/DevContext';
import styled from 'styled-components';

const color = '#80f8';

interface Props {
  visFor: string[];
  children: ReactNode;
  as?: 'span';
}

const Style = styled.div<{ debugInfo: string }>`
      box-shadow: 0 0 0 0.2rem ${color};
      position: relative;
      &::before {
        content: '${(props) => props.debugInfo}';
        position: absolute;
        right: 0;
        transform: translateY(-100%);
        background-color: ${color};
        color: white;
        font-size: .8rem;
        padding: .1rem;
        opacity: .8;
      }
`;

function VisForDebug(props: Props) {
  const devContext = useDevContext();
  const debug = devContext.value.highlightFiltrering && props.visFor.length;
  const debugInfo = 'Vises for ' + props.visFor.join(' & ');

  if (!debug) {
    return <>{props.children}</>;
  }

  return (
    <Style as={props.as} debugInfo={debugInfo}>
      {props.children}
    </Style>
  );
}

export default VisForDebug;
