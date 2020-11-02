import * as React from "react";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import withErrorBoundary from "../../components/withErrorBoundary";
import SistOppdatert from "../faktaside/SistOppdatert";

interface Props {
  heading: string;
  beskrivelse: string;
  small?: boolean;
  publiseringsTidspunkt?: string;
}

const Background = styled.div`
  background-color: ${theme.colors.navBlaLighten80};
  border-bottom: ${theme.border.banner};
  border-top: ${theme.border.banner};
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: ${theme.layoutMargin};
`;

const StyledSidetittel = styled(Sidetittel)`
  margin-bottom: 1rem;
`;

const MaxWidth = styled.div`
  padding: 1.5rem 0.5rem 2rem;
  max-width: 50rem;
`;

const Header = (props: Props) => {
  return (
    <Background>
      <MaxWidth>
        <StyledSidetittel>{props.heading}</StyledSidetittel>
        <Normaltekst>{props.beskrivelse}</Normaltekst>
        {props.publiseringsTidspunkt && <SistOppdatert publiseringsTidspunkt={props.publiseringsTidspunkt} />}
      </MaxWidth>
    </Background>
  );
};

export default withErrorBoundary(Header, "Header");
