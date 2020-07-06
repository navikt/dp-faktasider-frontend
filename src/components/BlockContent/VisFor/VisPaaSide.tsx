import * as React from 'react';
import { ReactNode } from 'react';
import { useFaktasideContext } from '../../../templates/faktaside/FaktaSideContext';

interface Props {
  children: ReactNode;
  visPaaSider?: string[];
}

function VisPaaSide(props: Props) {
  const faktasideContext = useFaktasideContext();

  const visPåDenneSiden = props.visPaaSider?.includes(faktasideContext.id);

  if (!visPåDenneSiden) {
    return null;
  }

  return <>{props.children}</>;
}

export default VisPaaSide;
