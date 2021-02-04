import * as React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import styled from "styled-components/macro";
import { Element } from "nav-frontend-typografi";
import { SanityBlock } from "../utils/richTextUtils/richTextTypes";
import { theme } from "../styles/theme";
import { contentMaxwidth } from "./forside/style";
import { typografiStyle } from "./faktaside/FaktaSideLayout";
import BlockContent from "./BlockContent/BlockContent";
import withErrorBoundary from "./withErrorBoundary";

export interface Notifikasjon {
  title?: string;
  innhold?: SanityBlock[];
  visPaaForside?: boolean;
  visPaaSider?: { _ref: string }[];
}

interface Props {
  notifikasjoner?: Notifikasjon[];
}

const Style = styled.div`
  margin-bottom: ${theme.layoutMargin};
  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .alertstripe__tekst {
    max-width: unset !important;
  }
  max-width: ${contentMaxwidth};
`;

const Content = styled.div`
  margin-top: 0.5rem;
  ${typografiStyle};
  > div *:last-child {
    margin-bottom: 0;
  }
`;

function Notifikasjoner(props: Props) {
  if (!props.notifikasjoner?.length) {
    return null;
  }

  return (
    <Style>
      {props.notifikasjoner.map((notifikasjon, i) => (
        <AlertStripeInfo key={i}>
          <Element>{notifikasjon.title}</Element>
          {notifikasjon.innhold && (
            <Content>
              <BlockContent blocks={notifikasjon.innhold} />
            </Content>
          )}
        </AlertStripeInfo>
      ))}
    </Style>
  );
}

export default withErrorBoundary(Notifikasjoner, "Notifikasjoner");
