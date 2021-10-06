import React, { useState } from "react";
import styled from "styled-components/macro";
import { SanityContent } from "../sanity-content/SanityContent";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import { useHistorikkContext } from "./HistorikkContext";
import { getTextFromSanityBlock } from "../../utils/richTextUtils/getTextFromSanityBlock";
import { loggHistorikk } from "../../utils/logging";
import { Accordion } from "@navikt/ds-react";

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
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      heading={title}
      open={open}
      id={props.infoId}
      onClick={() => {
        !open && loggHistorikk("Åpner Informasjon om historiske tekster");
        setOpen(!open);
      }}
    >
      <LangInfoStyle>
        <SanityContent blocks={textWithoutTitle} />
      </LangInfoStyle>
    </Accordion>
  );
}

export default LangInfo;
