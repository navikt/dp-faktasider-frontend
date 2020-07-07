import * as React from 'react';
import { ReactNode } from 'react';
import { useVisForContext } from './VisForContext';
import { useMount } from 'react-use';
import { UnmountClosed } from 'react-collapse';
import VisForDebug from './VisForDebug';

interface Props {
  children: ReactNode;
  visFor?: { [key: string]: boolean | string };
  inline?: boolean;
}

function VisFor(props: Props) {
  const visFor = props.visFor
    ? Object.entries(props.visFor)
        .filter((it) => it[1] === true)
        .map((it) => it[0])
    : [];

  const visForContext = useVisForContext();

  useMount(() => {
    visFor.forEach((key) => visForContext.dispatch({ type: 'addKey', key: key }));
  });

  const ingenFiltrering = visForContext.value.checked.length === 0;
  const valgtIFiltrering = visForContext.value.checked.some((it) => visFor.includes(it));
  const vis = (ingenFiltrering || valgtIFiltrering) && !visForContext.value.ingenPasserMeg;

  if (props.inline) {
    return vis ? <VisForDebug visFor={visFor} as="span" children={props.children} /> : null;
  }

  return (
    <UnmountClosed isOpened={vis}>
      <VisForDebug visFor={visFor} children={props.children} />
    </UnmountClosed>
  );
}

export default VisFor;
