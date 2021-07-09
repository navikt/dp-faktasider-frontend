import * as React from "react";
import { ReactNode } from "react";
import useVisPaaSideDebug from "./useVisPaaSideDebug";
import { VisPaaConfig } from "../../../utils/richTextUtils/richTextTypes";
import { useFaktasideContext } from "../../faktaside/FaktaSideContext";
import { useHistorikkContext } from "../../historikk/HistorikkContext";
import styled from "styled-components";
import { colors } from "../../../styles/theme";
import LitenHjelpetekst from "../../historikk/LitenHjelpetekst";
import { loggHistorikk } from "../../../utils/logging";

interface Props {
  children: ReactNode;
  visPaaSider?: VisPaaConfig;
}

const HistorikkStyle = styled.abbr`
  border-bottom: 0.2rem dashed ${colors.navBlaLighten40};

  & + & {
    margin-left: 1rem; // For å skille to elementer som ligger intill hverandre
  }
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
        <LitenHjelpetekst title="Forklaring" onClick={() => loggHistorikk("Viser hjelpetekst for visPaaSide")}>
          Denne teksten ble kun vist på utvalgte sider med id: {props.visPaaSider?.join(", ")}
        </LitenHjelpetekst>
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
