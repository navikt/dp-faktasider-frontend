import * as React from 'react';
import VisFor from './VisFor';
import { VisForConfig } from '../../../utils/richTextUtils/richTextTypes';

interface Props {
  children: string[];
  mark: {
    visFor?: VisForConfig;
  };
}

const VisForAnnotation = (props: Props) => {
  if (props.mark.visFor) {
    return (
      <VisFor inline={true} visFor={props.mark.visFor}>
        {props.children}
      </VisFor>
    );
  }

  return <>{props.children}</>;
};

export default VisForAnnotation;
