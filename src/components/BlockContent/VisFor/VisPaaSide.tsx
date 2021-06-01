import * as React from "react";
import { ReactNode } from "react";
import useVisPaaSideDebug from "./useVisPaaSideDebug";
import { VisPaaConfig } from "../../../utils/richTextUtils/richTextTypes";
import { useFaktasideContext } from "../../faktaside/FaktaSideContext";
import { useHistorikkContext } from "../../historikk/HistorikkContext";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  visPaaSider?: VisPaaConfig;
}

const HistorikkStyle = styled.span`
  border-bottom: 0.2rem solid yellowgreen;
`;

export function visBasertPaaVisPaaConfig(faktasideId?: string, visPaaConfig?: VisPaaConfig) {
  const visSpesifiktPåDenneSiden = !!visPaaConfig?.includes(faktasideId || "N/A");
  const ingenVisPåConfig = !visPaaConfig?.length;
  const visPåDenneSiden = ingenVisPåConfig || visSpesifiktPåDenneSiden;

  return visPåDenneSiden;
}

function VisPaaSide(props: Props) {
  const faktaside = useFaktasideContext();
  const historikkContext = useHistorikkContext();

  const visPåDenneSiden = visBasertPaaVisPaaConfig(faktaside.id, props.visPaaSider);
  const visPåDenneSidenDebug = useVisPaaSideDebug({ children: props.children, ikkeVisPåDenneSiden: !visPåDenneSiden });

  if (historikkContext.isHistorikk && props.visPaaSider?.length) {
    return (
      <HistorikkStyle>
        {props.children}{" "}
        <Hjelpetekst>Denne teksten ble kun vist på sidene: {props.visPaaSider?.join(", ")}</Hjelpetekst>
      </HistorikkStyle>
    );
  }
  if (visPåDenneSidenDebug.debug) {
    return visPåDenneSidenDebug.component;
  }

  if (!visPåDenneSiden) {
    return null;
  }

  return <>{props.children}</>;
}

export default VisPaaSide;
