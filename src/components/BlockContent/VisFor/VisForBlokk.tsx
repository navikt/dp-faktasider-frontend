import * as React from 'react';
import { SanityBlock } from '../../../utils/richTextUtils/richTextTypes';
import BlockContent from '../BlockContent';
import VisFor from './VisFor';

interface Props {
  node: {
    innhold: SanityBlock[];
    visFor: { [key: string]: boolean | string };
  };
}

const VisForBlokk = (props: Props) => (
  <VisFor visForConfig={props.node.visFor}>
    <BlockContent blocks={props.node.innhold} />
  </VisFor>
);

export default VisForBlokk;
