import styled from "styled-components/macro";
import { contentMaxwidth } from "./style";
import BlockContent from "../BlockContent/BlockContent";
import { ParsedRichText } from "../../utils/richTextUtils/parser/parseRichText";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import React from "react";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { useTranslation } from "react-i18next";

const Style = styled.article`
  max-width: ${contentMaxwidth};
  ${typografiStyle};
  padding: 2rem;
  background-color: white;
`;

const Content = styled.div`
  max-width: 40rem;
`;

function KortFortalt(props: { kortFortalt?: ParsedRichText; beskrivelse?: string }) {
  const { t } = useTranslation();

  if (!props.kortFortalt?.length) {
    return null;
  }

  return (
    <Style>
      <Innholdstittel>{t("forsideIntroTittel")}</Innholdstittel>
      <Content>
        <Normaltekst>{props.beskrivelse}</Normaltekst>
        <BlockContent blocks={props.kortFortalt} />
      </Content>
    </Style>
  );
}

export default KortFortalt;
