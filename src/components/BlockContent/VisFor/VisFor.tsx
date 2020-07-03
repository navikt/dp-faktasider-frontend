import * as React from 'react';
import { ReactNode } from 'react';
import { useVisForContext } from './VisForContext';
import { useMount } from 'react-use';
import { UnmountClosed } from 'react-collapse';
import { useDevContext } from '../../DevKnapper/DevContext';
import styled, { css } from 'styled-components';

interface Props {
  children: ReactNode;
  visFor?: { [key: string]: boolean | string };
  inline?: boolean;
}

const color = '#80f8';

const Style = styled.div<{ debug: boolean; debugInfo: string }>`
  ${(props) =>
    props.debug &&
    css`
      box-shadow: 0 0 0 0.2rem ${color};
      position: relative;
      &::before {
        content: '${props.debugInfo}';
        position: absolute;
        right: 0;
        transform: translateY(-100%);
        background-color: ${color};
        color: white;
        font-size: .8rem;
        padding: .1rem;
        opacity: .8;
      }
    `}
`;

function VisFor(props: Props) {
  const visFor = props.visFor
    ? Object.entries(props.visFor)
        .filter((it) => it[1] === true)
        .map((it) => it[0])
    : [];

  const visForContext = useVisForContext();
  const devContext = useDevContext();
  const visOutline = devContext.value.visFiltrering;

  useMount(() => {
    visFor.forEach((key) => visForContext.dispatch({ type: 'addKey', key: key }));
  });

  const ingenFiltrering = visForContext.value.checked.length === 0;
  const valgtIFiltrering = visForContext.value.checked.some((it) => visFor.includes(it));
  const vis = (ingenFiltrering || valgtIFiltrering) && !visForContext.value.ingenPasserMeg;
  const debugInfo = 'Vises for ' + visFor.join(' & ');

  if (props.inline) {
    return vis ? (
      <Style debugInfo={debugInfo} debug={visOutline} as="span">
        {props.children}
      </Style>
    ) : null;
  }

  return (
    <UnmountClosed isOpened={vis}>
      <Style debugInfo={debugInfo} debug={visOutline}>
        {props.children}
      </Style>
    </UnmountClosed>
  );
}

export default VisFor;
