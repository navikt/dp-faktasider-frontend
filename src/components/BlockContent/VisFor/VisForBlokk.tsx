import * as React from 'react';
import { SanityBlock } from '../../../utils/richTextUtils/richTextTypes';
import BlockContent from '../BlockContent';
import { useMount } from 'react-use';
import { useVisFor } from './VisForContext';
import { UnmountClosed } from 'react-collapse';

interface Props {
  node: {
    innhold: SanityBlock[];
    visFor: { [key: string]: boolean | string };
  };
}

function VisForBlokk(props: Props) {
  const visFor = Object.entries(props.node.visFor)
    .filter((it) => it[1] === true)
    .map((it) => it[0]);
  const visForContext = useVisFor();

  useMount(() => {
    visFor.forEach((key) => visForContext.add(key));
  });

  const ingenFiltrering = visForContext.checked.length === 0;
  const valgtIFiltrering = visForContext.checked.some((it) => visFor.includes(it));

  return (
    <UnmountClosed isOpened={ingenFiltrering || valgtIFiltrering}>
      <BlockContent blocks={props.node.innhold} />
    </UnmountClosed>
  );
}

export default VisForBlokk;
