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
  const visPåDenneSiden = props.visPaaSider?.includes(faktasideContext.id);
  const visPåDenneSidenDebug = useVisPaaSideDebug(props);

  if (visPåDenneSidenDebug.debug) {
    return visPåDenneSidenDebug.component;
  }

  if (!visPåDenneSiden) {
    return null;
  }

  return <>{props.children}</>;
}

export default VisPaaSide;
