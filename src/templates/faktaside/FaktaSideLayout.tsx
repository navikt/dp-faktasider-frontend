import * as React from "react";
import { ReactNode, RefObject } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Navigasjonsmeny from "./Navigasjonsmeny/Navigasjonsmeny";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import DevKnapper from "../../components/DevKnapper/DevKnapper";
import { MainContentStyle } from "./MainContentStyle";
import withErrorBoundary from "../../components/withErrorBoundary";
import Filtrering from "./TilpassInnhold/TilpassInnhold";
import { theme } from "../../styles/theme";
import Header from "./Header";

interface Props {
  header: string;
  beskrivelse: string;
  children: ReactNode;
  publiseringsTidspunkt?: string;
  wordCountRef?: RefObject<HTMLElement>;
}

export const maxWidth = "77rem";

const Brødsmulestyling = createGlobalStyle`
.decorator-wrapper .decorator-utils-content {
  max-width: ${maxWidth};
  margin-bottom: .5rem;
}
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
      <LanguageSelector />
      <DevKnapper />
      <ContentStyle>
        <Navigasjonsmeny className="order-1" />
        {props.wordCountRef && <Filtrering wordCountRef={props.wordCountRef} className="order-3" />}
        <div className="order-2">
          <Header
            heading={props.header}
            beskrivelse={props.beskrivelse}
            publiseringsTidspunkt={props.publiseringsTidspunkt}
          />
          <MainContentStyle>{props.children}</MainContentStyle>
        </div>
      </ContentStyle>
    </>
  );
}

export default withErrorBoundary(FaktaSideLayout, "FaktaSideLayout");
