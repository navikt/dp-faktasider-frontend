import { Next } from "@navikt/ds-icons";
import styled from "styled-components/macro";

type Retning = "høyre" | "opp" | "ned" | "venstre";

const konverteringsTabell: Record<Retning, number> = {
  høyre: 0,
  opp: -90,
  venstre: 180,
  ned: 90,
};

interface Props {
  retning: Retning;
}

const StyledChevron = styled(Next)<Props>`
  transform: rotate(${(p) => konverteringsTabell[p.retning]}deg);
  transition: transform 0.3s;
  color: currentColor !important;
  display: block;
`;

export default StyledChevron;
