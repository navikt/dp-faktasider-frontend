import * as React from "react";
import styled from "styled-components/macro";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import SistOppdatert from "./SistOppdatert";

interface Props {
  heading: string;
  beskrivelse: string;
  publiseringsTidspunkt?: string;
}

const Style = styled.div`
  text-align: center;
  margin: 1rem auto 2rem;
  max-width: 38rem;
`;

const StyledSidetittel = styled(Sidetittel)`
  margin-bottom: 0.75rem;
`;

function Header(props: Props) {
  return (
    <Style>
      <StyledSidetittel>{props.heading}</StyledSidetittel>
      <Normaltekst>{props.beskrivelse}</Normaltekst>
      <SistOppdatert publiseringsTidspunkt={props.publiseringsTidspunkt} />
    </Style>
  );
}

export default Header;
