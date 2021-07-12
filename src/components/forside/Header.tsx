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
  display: flex;
  justify-content: center;
`;

const StyledSidetittel = styled(Sidetittel)`
  align-self: center;
  padding: 1rem 2rem;
`;

const Content = styled.div`
  max-width: 100vw;
  width: ${contentMaxwidth};
  display: flex;
  justify-content: space-between;
`;

const StyledHeaderIkon = styled(HeaderIkon)`
  padding-top: 1rem;
  margin-right: 2rem;
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
