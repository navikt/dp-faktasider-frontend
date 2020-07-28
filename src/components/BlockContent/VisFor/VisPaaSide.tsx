import * as React from 'react';
import { ReactNode } from 'react';
import { useFaktasideContext } from '../../../templates/faktaside/FaktaSideContext';
import useVisPaaSideDebug from './useVisPaaSideDebug';

interface Props {
  children: ReactNode;
  visPaaSider?: string[];
}

function VisPaaSide(props: Props) {
  const faktasideContext = useFaktasideContext();
  const visSpesifiktPåDenneSiden = !!props.visPaaSider?.includes(faktasideContext.id);
  const ingenVisPåConfig = !!props.visPaaSider?.length;
  const visPåDenneSiden = !ingenVisPåConfig || visSpesifiktPåDenneSiden; // TODO bug..? ingenVisPåConfig || visSpesifiktPåDenneSiden
  const visPåDenneSidenDebug = useVisPaaSideDebug({ children: props.children, ikkeVisPåDenneSiden: !visPåDenneSiden });

  if (visPåDenneSidenDebug.debug) {
    return visPåDenneSidenDebug.component;
  }

  if (!visPåDenneSiden) {
    return null;
  }

  return <>{props.children}</>;
}

export default VisPaaSide;
