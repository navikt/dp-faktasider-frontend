import React from "react";
import { SanityBlock, VisForConfig } from "../../../utils/richTextUtils/richTextTypes";
import { SanityContent } from "../../sanity-content/SanityContent";
import VisFor from "./VisFor";

interface Props {
  node: {
    innhold: SanityBlock[];
    visFor: VisForConfig;
  };
}

const VisForBlokk = (props: Props) => (
  <VisFor visForConfig={props.node.visFor}>
    <SanityContent blocks={props.node.innhold} />
  </VisFor>
);

export default VisForBlokk;
