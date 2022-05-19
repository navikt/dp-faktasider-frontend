import React, { useState } from "react";
import styled from "styled-components";
import { Accordion } from "@navikt/ds-react";
import { SanityContent } from "../sanity-content/SanityContent";
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
  const [open, setOpen] = useState(false);
  const hjelpeTekster = useHistorikkContext().hjelpeTekster;
  const titleBlock = hjelpeTekster?.langInfo.find((block) => block.style === "h2");
  const title = titleBlock && getTextFromSanityBlock(titleBlock);
  const textWithoutTitle = hjelpeTekster?.langInfo.filter((it) => it !== titleBlock);

  return (
    <Accordion id={props.infoId}>
      <Accordion.Item open={open}>
        <Accordion.Header
          onClick={() => {
            !open && loggHistorikk("Åpner Informasjon om historiske tekster");
            setOpen(!open);
          }}
        >
          {title}
        </Accordion.Header>
        <Accordion.Content>
          <LangInfoStyle>
            <SanityContent blocks={textWithoutTitle} />
          </LangInfoStyle>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

export default LangInfo;
