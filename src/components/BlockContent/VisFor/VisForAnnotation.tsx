import * as React from 'react';
import VisFor from './VisFor';

interface Props {
  children: string[];
  mark: {
    visFor: { [key: string]: boolean | string };
  };
}

const VisForAnnotation = (props: Props) => (
  <VisFor inline={true} visFor={props.mark.visFor}>
    {props.children}
  </VisFor>
);

export default VisForAnnotation;
