import * as React from "react";
import { SanityBlock, VisForConfig } from "../../../utils/richTextUtils/richTextTypes";
import BlockContent from "../BlockContent";
import VisFor from "./VisFor";

interface Props {
  node: {
    innhold: SanityBlock[];
    visFor: VisForConfig;
  };
}

const VisForBlokk = (props: Props) => (
  <VisFor visForConfig={props.node.visFor}>
    <BlockContent blocks={props.node.innhold} />
  </VisFor>
);

export default VisForBlokk;
