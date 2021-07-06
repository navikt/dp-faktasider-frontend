import styled from "styled-components/macro";
import { contentMaxwidth } from "./style";
import BlockContent from "../BlockContent/BlockContent";
import { ParsedRichText } from "../../utils/richTextUtils/parser/parseRichText";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import React from "react";
import { Innholdstittel } from "nav-frontend-typografi";

const Style = styled.div`
  max-width: ${contentMaxwidth};
  ${typografiStyle};
  padding: 2rem;
  background-color: white;
`;

function KortFortalt(props: { kortFortalt?: ParsedRichText }) {
  if (!props.kortFortalt?.length) {
    return null;
  }

  return (
    <Style>
      <Innholdstittel>Kort fortalt</Innholdstittel>
      <BlockContent blocks={props.kortFortalt} />
    </Style>
  );
}

export default KortFortalt;
