import * as React from "react";
import VisFor from "./VisFor";
import { VisForConfig } from "../../../utils/richTextUtils/richTextTypes";
import withErrorBoundary from "../../withErrorBoundary";

interface Props {
  children: string[];
  mark: {
    visFor?: VisForConfig;
  };
}

const VisForAnnotation = (props: Props) => {
  if (props.mark.visFor) {
    return (
      <VisFor inline={true} visForConfig={props.mark.visFor}>
        {props.children}
      </VisFor>
    );
  }

  return <>{props.children}</>;
};

export default withErrorBoundary(VisForAnnotation, "VisForAnnotation");
