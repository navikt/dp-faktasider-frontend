import * as React from "react";
import { Sidetittel } from "nav-frontend-typografi";
import styled, { createGlobalStyle } from "styled-components/macro";
import { theme } from "../../styles/theme";
import withErrorBoundary from "../../components/withErrorBoundary";
import HeaderIkon from "./HeaderIkon";
import { contentMaxwidth } from "./style";

interface Props {
  heading: string;
}

const Background = styled.div`
  background-color: ${theme.colors.navBlaLighten80};
  border-bottom: ${theme.border.banner};
  box-shadow: inset 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
`;

const StyledSidetittel = styled(Sidetittel)`
  align-self: center;
`;

const Content = styled.div`
  max-width: 100vw;
  width: ${contentMaxwidth};
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
`;

const StyledHeaderIkon = styled(HeaderIkon)`
  padding-top: 1rem;
  width: 12rem;
  margin-left: 2rem;
  @media (max-width: 50em) {
    display: none;
  }
`;

const BrødsmuleStyling = createGlobalStyle`
    .decorator-utils-container {
      background-color: white;
    }
`;

const Header = (props: Props) => {
  return (
    <Background>
      <BrødsmuleStyling />
      <Content>
        <StyledSidetittel>{props.heading}</StyledSidetittel>
        <StyledHeaderIkon />
      </Content>
    </Background>
  );
};

export default withErrorBoundary(Header, "Header");
