import * as React from 'react';
import { ReactNode } from 'react';
import { useFaktasideContext } from '../../../templates/faktaside/FaktaSideContext';
import useVisPaaSideDebug from './useVisPaaSideDebug';
import { VisPaaConfig } from '../../../utils/richTextUtils/richTextTypes';

interface Props {
  children: ReactNode;
  visPaaSider?: VisPaaConfig;
}

export function visBasertPaaVisPaaConfig(faktasideId: string, visPaaConfig?: VisPaaConfig) {
  const visSpesifiktPåDenneSiden = !!visPaaConfig?.includes(faktasideId);
  const ingenVisPåConfig = !visPaaConfig?.length;
  const visPåDenneSiden = ingenVisPåConfig || visSpesifiktPåDenneSiden;

  return visPåDenneSiden;
}

function VisPaaSide(props: Props) {
  const faktasideContext = useFaktasideContext();
  const visPåDenneSiden = visBasertPaaVisPaaConfig(faktasideContext.id, props.visPaaSider);
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
