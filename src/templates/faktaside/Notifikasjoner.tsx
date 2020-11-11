import * as React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import { Element } from "nav-frontend-typografi";
import { Translations } from "../../types/translations";

export interface Notifikasjon {
  title?: Translations<string>;
  innhold?: Translations<string>;
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
          <Content>{notifikasjon.innhold}</Content>
        </AlertStripeInfo>
      ))}
    </Style>
  );
}

export default Notifikasjoner;
