import * as React from "react";
import { ReactNode } from "react";
import styled, { createGlobalStyle, css } from "styled-components/macro";
import withErrorBoundary from "../../components/withErrorBoundary";
import { theme } from "../../styles/theme";
import Meny from "./Meny/Meny";

interface Props {
  children: ReactNode;
}

export const maxWidth = "67rem";

const Brødsmulestyling = createGlobalStyle`
.decorator-wrapper .decorator-utils-content {
  max-width: ${maxWidth};
  margin-bottom: .5rem;
}
`;

export const typografiStyle = css`
  ul,
  ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    li {
      margin: 0.7rem 0;
      padding-left: 0.3rem;
      &:empty {
        display: none; //Dette gjøres for å hindre bulletpoints uten tekst å dukke opp, da vi skjuler tekst på visse sider (visFor og visPaaSide)
      }
    }
  }
  ul {
    list-style: disc;
    ul {
      list-style: circle;
    }
  }
  ol {
    list-style: decimal;
  }

  p {
    margin: 0.5rem 0 1rem;
  }
`;

export const MainContentStyle = styled.main`
  flex: 0 1 40rem;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 40rem;
  padding: 0 1rem;
  @media (${theme.media.smallScreen}) {
    padding: 0;
  }
  ${typografiStyle}
`;

const ContentStyle = styled.div`
  flex-grow: 1;
  position: relative;
  min-height: 30vh;
  max-width: ${maxWidth};
  margin: 0 auto;
  @media (${theme.media.bigScreen}) {
    display: flex;
    align-items: flex-start;
  }
`;

function FaktaSideLayout(props: Props) {
  return (
    <>
      <Brødsmulestyling />
      <ContentStyle>
        <Meny />
        <MainContentStyle id={"maincontent"}>{props.children}</MainContentStyle>
      </ContentStyle>
    </>
  );
}

export default withErrorBoundary(FaktaSideLayout, "FaktaSideLayout");
