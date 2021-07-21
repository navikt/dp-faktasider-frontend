import * as React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { theme } from "../../styles/theme";
import withErrorBoundary from "../../components/withErrorBoundary";
import HeaderIkon from "./HeaderIkon";
import { contentMaxwidth } from "./style";
import { Title } from "@navikt/ds-react";

interface Props {
  heading: string;
}

const Background = styled.div`
  background-color: ${theme.colors.navBlaLighten80};
  border-bottom: ${theme.border.banner};
  display: flex;
  justify-content: center;
`;

const StyledSidetittel = styled(Title).attrs({ level: "1", size: "2xl" })`
  align-self: center;
  padding: 1rem ${theme.layoutPadding};
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
