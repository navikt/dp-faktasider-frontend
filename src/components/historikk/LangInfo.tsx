import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import React from "react";
import styled from "styled-components/macro";
import BlockContent from "../BlockContent/BlockContent";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import { useHistorikkContext } from "./HistorikkContext";
import { getTextFromSanityBlock } from "../../utils/richTextUtils/getTextFromSanityBlock";
import { loggHistorikk } from "../../utils/logging";

const LangInfoStyle = styled.div`
  ${typografiStyle};

  h2,
  h3 {
    margin-bottom: 0.5em;
  }

  h3 {
    margin-top: 3rem;
  }
`;

function LangInfo(props: { infoId: string }) {
  const hjelpeTekster = useHistorikkContext().hjelpeTekster;

  const titleBlock = hjelpeTekster?.langInfo.find((block) => block.style === "h2");
  const title = titleBlock && getTextFromSanityBlock(titleBlock);
  const textWithoutTitle = hjelpeTekster?.langInfo.filter((it) => it !== titleBlock);

  return (
    <Ekspanderbartpanel
      tittel={title}
      id={props.infoId}
      onClick={() => loggHistorikk("Åpner Informasjon om historiske tekster")}
    >
      <LangInfoStyle>
        <BlockContent blocks={textWithoutTitle} />
      </LangInfoStyle>
    </Ekspanderbartpanel>
  );
}

export default LangInfo;
