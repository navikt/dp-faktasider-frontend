import * as React from "react";
import { ReactNode, RefObject } from "react";
import styled, { createGlobalStyle, css } from "styled-components/macro";
import DevKnapper from "../../components/DevKnapper/DevKnapper";
import withErrorBoundary from "../../components/withErrorBoundary";
import Filtrering from "./TilpassInnhold/TilpassInnhold";
import { theme } from "../../styles/theme";
import Meny from "./Meny/Meny";

interface Props {
  children: ReactNode;
  wordCountRef?: RefObject<HTMLElement>;
}

export const maxWidth = "77rem";

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
    .order-1 {
      order: 1;
    }
    .order-2 {
      order: 2;
      flex-grow: 1;
    }
    .order-3 {
      order: 3;
    }
  }
`;

function FaktaSideLayout(props: Props) {
  return (
    <>
      <Brødsmulestyling />
      <DevKnapper />
      <ContentStyle>
        <Meny className="order-1" />
        {props.wordCountRef && <Filtrering wordCountRef={props.wordCountRef} className="order-3" />}
        <MainContentStyle className="order-2">{props.children}</MainContentStyle>
      </ContentStyle>
    </>
  );
}

export default withErrorBoundary(FaktaSideLayout, "FaktaSideLayout");
