import * as React from 'react';
import { ReactNode } from 'react';
import { useVisForContext } from './VisForContext';
import { useMount } from 'react-use';
import { UnmountClosed } from 'react-collapse';
import { useDevContext } from '../../DevKnapper/DevContext';
import styled, { css } from 'styled-components';

interface Props {
  children: ReactNode;
  visFor: { [key: string]: boolean | string };
  inline?: boolean;
}

const color = '#80f8';

const Style = styled.div<{ outline: boolean }>`
  ${(props) =>
    props.outline &&
    css`
      box-shadow: 0 0 0 0.2rem ${color};
    `}
`;

function VisFor(props: Props) {
  const visFor = Object.entries(props.visFor)
    .filter((it) => it[1] === true)
    .map((it) => it[0]);

  const visForContext = useVisForContext();
  const devContext = useDevContext();
  const visOutline = devContext.value.visFiltrering;
  console.log(visOutline);

  useMount(() => {
    visFor.forEach((key) => visForContext.dispatch({ type: 'addKey', key: key }));
  });

  const ingenFiltrering = visForContext.value.checked.length === 0;
  const valgtIFiltrering = visForContext.value.checked.some((it) => visFor.includes(it));
  const vis = (ingenFiltrering || valgtIFiltrering) && !visForContext.value.ingenPasserMeg;
  const title = 'Vises for ' + visFor.join(' & ');

  if (props.inline) {
    return vis ? (
      <Style title={title} outline={visOutline} as="span">
        {props.children}
      </Style>
    ) : null;
  }

  return (
    <UnmountClosed isOpened={vis}>
      <Style title={title} outline={visOutline}>
        {props.children}
      </Style>
    </UnmountClosed>
  );
}

export default VisFor;
