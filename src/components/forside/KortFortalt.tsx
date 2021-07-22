import styled from "styled-components/macro";
import { contentMaxwidth } from "./style";
import BlockContent from "../BlockContent/BlockContent";
import { ParsedRichText } from "../../utils/richTextUtils/parser/parseRichText";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import React from "react";
import { useTranslation } from "react-i18next";
import { BodyLong, Title } from "@navikt/ds-react";

const Style = styled.article`
  max-width: ${contentMaxwidth};
  padding: 2rem 2rem 1rem;
  background-color: white;
`;

const Content = styled.div`
  max-width: 40rem;
  ${typografiStyle};
  li {
    margin: 0.2rem 0 !important; // Litt mindre luft mellom bulletpoints på forside for å spare plass så brukerne ser navigasjon til videre sider i første skjermbilde
  }
`;

function KortFortalt(props: { kortFortalt?: ParsedRichText; beskrivelse?: string }) {
  const { t } = useTranslation();

  return (
    <Style>
      <Title level="2" size="m">
        {t("forsideIntroTittel")}
      </Title>
      <Content>
        <BodyLong>{props.beskrivelse}</BodyLong>
        <BlockContent blocks={props.kortFortalt} />
      </Content>
    </Style>
  );
}

export default KortFortalt;
