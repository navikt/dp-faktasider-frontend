import * as React from "react";
import styled from "styled-components/macro";
import { SanityBlock } from "../utils/richTextUtils/richTextTypes";
import { contentMaxwidth } from "./forside/style";
import { typografiStyle } from "./faktaside/FaktaSideLayout";
import BlockContent from "./BlockContent/BlockContent";
import withErrorBoundary from "./withErrorBoundary";
import { theme } from "../styles/theme";
import { Alert, Label } from "@navikt/ds-react";

export interface Notifikasjon {
  title?: string;
  innhold?: SanityBlock[];
  visPaaForside?: boolean;
  visPaaFaktaSider?: string[];
}

interface Props {
  notifikasjoner?: Notifikasjon[];
}

const Style = styled.article`
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
      <h2 className="sr-only">Notifikasjoner</h2>
      {props.notifikasjoner.map((notifikasjon, i) => (
        <Alert variant="info" key={i}>
          <Label size="m" spacing>
            {notifikasjon.title}
          </Label>
          {notifikasjon.innhold && (
            <Content>
              <BlockContent blocks={notifikasjon.innhold} />
            </Content>
          )}
        </Alert>
      ))}
    </Style>
  );
}

export default withErrorBoundary(Notifikasjoner, "Notifikasjoner");
