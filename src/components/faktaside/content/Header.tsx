import * as React from "react";
import styled from "styled-components/macro";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import SistOppdatert from "./SistOppdatert";
import { useFaktasideContext } from "../FaktaSideContext";

const Style = styled.div`
  text-align: center;
  margin: 1rem auto 2rem;
  max-width: 38rem;
`;

const StyledSidetittel = styled(Sidetittel)`
  margin-bottom: 0.75rem !important;
`;

function Header() {
  const faktaside = useFaktasideContext();
  return (
    <Style>
      <StyledSidetittel>{faktaside.title}</StyledSidetittel>
      <Normaltekst>{faktaside.beskrivelse}</Normaltekst>
      <SistOppdatert publiseringsTidspunkt={faktaside.publiseringsTidspunkt} />
    </Style>
  );
}

export default Header;
