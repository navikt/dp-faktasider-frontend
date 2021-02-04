import * as React from "react";
import { ReactNode } from "react";
import useVisPaaSideDebug from "./useVisPaaSideDebug";
import { VisPaaConfig } from "../../../utils/richTextUtils/richTextTypes";
import { useFaktasideContext } from "../../faktaside/FaktaSideContext";

interface Props {
  children: ReactNode;
  visPaaSider?: VisPaaConfig;
}

export function visBasertPaaVisPaaConfig(faktasideId?: string, visPaaConfig?: VisPaaConfig) {
  const visSpesifiktPåDenneSiden = !!visPaaConfig?.includes(faktasideId || "N/A");
  const ingenVisPåConfig = !visPaaConfig?.length;
  const visPåDenneSiden = ingenVisPåConfig || visSpesifiktPåDenneSiden;

  return visPåDenneSiden;
}

function VisPaaSide(props: Props) {
  const faktaside = useFaktasideContext();
  const visPåDenneSiden = visBasertPaaVisPaaConfig(faktaside.id, props.visPaaSider);
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
