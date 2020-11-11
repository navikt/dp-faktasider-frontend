import * as React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import { Element } from "nav-frontend-typografi";
import withErrorBoundary from "../../components/withErrorBoundary";
import BlockContent from "../../components/BlockContent/BlockContent";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";

export interface Notifikasjon {
  title?: string;
  innhold?: SanityBlock[];
  visPaaForside?: boolean;
  visPaaSider?: { id: string }[];
}

interface Props {
  notifikasjoner?: Notifikasjon[];
}

const Style = styled.div`
  margin-bottom: ${theme.layoutMargin};
  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Content = styled.div`
  margin-top: 0.5rem;
`;

function Notifikasjoner(props: Props) {
  if (!props.notifikasjoner?.length) {
    return null;
  }

  return (
    <Style>
      {props.notifikasjoner.map((notifikasjon) => (
        <AlertStripeInfo>
          <Element tag="h3">{notifikasjon.title}</Element>
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
