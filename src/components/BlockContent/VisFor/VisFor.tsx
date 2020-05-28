import * as React from 'react';
import { ReactNode } from 'react';
import { useVisFor } from './VisForContext';
import { useMount } from 'react-use';
import { UnmountClosed } from 'react-collapse';

interface Props {
  children: ReactNode;
  visFor: { [key: string]: boolean | string };
}

function VisFor(props: Props) {
  const visFor = Object.entries(props.visFor)
    .filter((it) => it[1] === true)
    .map((it) => it[0]);

  const visForContext = useVisFor();

  useMount(() => {
    visFor.forEach((key) => visForContext.add(key));
  });

  const ingenFiltrering = visForContext.checked.length === 0;
  const valgtIFiltrering = visForContext.checked.some((it) => visFor.includes(it));

  return <UnmountClosed isOpened={ingenFiltrering || valgtIFiltrering}>{props.children}</UnmountClosed>;
}

export default VisFor;
