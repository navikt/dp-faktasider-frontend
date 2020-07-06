import * as React from 'react';
import { RawFaktasideData } from '../../../../gatsby-utils/createFaktasider';
import { useFaktasideContext } from '../../../templates/faktaside/FaktaSideContext';
import VisForAnnotation from './VisForAnnotation';
import { VisForConfig } from '../../../utils/richTextUtils/richTextTypes';
import useVisPaaSideDebug from './useVisPaaSideDebug';

interface Props {
  children: string[];
  mark: {
    visFor?: VisForConfig;
    visPaaSider?: RawFaktasideData[];
  };
}

const VisForAnnotationDeltTekst = (props: Props) => {
  const visPaa = props.mark.visPaaSider?.map((side) => side.id);
  const faktasideContext = useFaktasideContext();
  const debug = useVisPaaSideDebug({ children: props.children, visPaaSider: visPaa });
  const visPaaSide = !visPaa || visPaa.includes(faktasideContext.id);

  if (debug.debug) {
    return debug.component;
  }

  if (!visPaaSide) {
    return null;
  }

  return <VisForAnnotation children={props.children} mark={{ visFor: props.mark.visFor }} />;
};

export default VisForAnnotationDeltTekst;
