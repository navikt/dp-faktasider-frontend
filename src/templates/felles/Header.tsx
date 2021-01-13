import * as React from "react";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import withErrorBoundary from "../../components/withErrorBoundary";
import HeaderIkon from "./HeaderIkon";
import { contentMaxwidth } from "../landingsside/style";

interface Props {
  heading: string;
  beskrivelse: string;
}

const Background = styled.div`
  background-color: ${theme.colors.navDypBlaLighten80};
  border-bottom: ${theme.border.banner};
  box-shadow: inset 0 0.2rem 0.2rem rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.layoutMargin};
`;

const StyledSidetittel = styled(Sidetittel)`
  margin: 0 0 0.5rem 0;
`;

const Content = styled.div`
  padding: 1rem 0 1.5rem;
  max-width: 100vw;
  width: ${contentMaxwidth};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 1rem;
`;

const StyledHeaderIkon = styled(HeaderIkon)`
  width: 12rem;
  transform: translateY(1.5rem);
  margin-left: 2rem;
  @media (max-width: 50em) {
    display: none;
  }
`;

const Header = (props: Props) => {
  return (
    <Background>
      <Content>
        <div>
          <StyledSidetittel>{props.heading}</StyledSidetittel>
          <Normaltekst>{props.beskrivelse}</Normaltekst>
        </div>
        <StyledHeaderIkon />
      </Content>
    </Background>
  );
};

export default withErrorBoundary(Header, "Header");
