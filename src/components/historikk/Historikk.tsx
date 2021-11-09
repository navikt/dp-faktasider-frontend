import React, { useState } from "react";
import styled from "styled-components/macro";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { HistorikkProps } from "../../pages/historikk/[...slug]";
import useUniqueId from "../../utils/useUniqueId";
import Head from "next/head";
import HistorikkContextProvider from "./HistorikkContext";
import { DokumentRekonstruksjon } from "./DokumentRekonstruksjon";
import { HistoriskDokument } from "./api/historikkFetcher";
import { useMount } from "react-use";
import { loggHistorikk } from "../../utils/logging";
import useBreadcrumbs from "../faktaside/useBreadcrumbs";
import HistorikkHeader from "./HistorikkHeader";
import HistoirkkWatermark from "./Watermark";
import { formaterDato } from "../../utils/formaterDato";
import { Accordion } from "@navikt/ds-react";
import LangInfo from "./LangInfo";

const StyledMain = styled.main`
  max-width: 70rem;
  margin: auto;
  background-color: white;
  padding: 5rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  --content-max-width: 50rem;

  .popover__content-inner {
    max-width: 40ch;
  }

  > * {
    width: var(--content-max-width);
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const RådataEkspanderbartPanel = styled(Accordion)`
  .navds-accordion__content {
    background-color: #efefef;
  }
`;

const StyledPre = styled.pre`
  font-size: 0.75rem;
  white-space: break-spaces;
  word-break: break-word;
`;

export function Historikk(props: HistorikkProps) {
  const localizedDoc: HistoriskDokument | undefined = localizeSanityContent(props.response?.documents[0], "no");
  const infoId = useUniqueId("info");
  const documentTitle = getTitle(localizedDoc);
  const [openRådata, setOpenRådata] = useState(false);

  const loggingInfo = {
    nåværendeTittel: props.nåværendeSidetittel,
    timestamp: formaterDato(localizedDoc?._updatedAt || ""),
  };

  useMount(() => loggHistorikk("Sidevisning", loggingInfo));
  useBreadcrumbs(props.domeneTittel, [
    { tittel: "Historikk", path: "historikk" },
    { tittel: documentTitle, path: `historikk/${localizedDoc?._id}/${localizedDoc?._updatedAt}` },
  ]);

  return (
    <HistorikkContextProvider
      requestTimestamp={props.request.time}
      hjelpeTekster={props.hjelpeTekster}
      isHistorikk={true}
      loggingInfo={loggingInfo}
    >
      <HistoirkkWatermark />
      <Head>
        <meta name="robots" content="none" />
        <title>{props.hjelpeTekster?.title} | www.nav.no</title>
      </Head>
      <StyledMain>
        <HistorikkHeader document={localizedDoc} revisions={props.revisions} title={documentTitle} />
        <DokumentRekonstruksjon dokument={localizedDoc} lesMerLenkeId={infoId} />

        <RådataEkspanderbartPanel>
          <Accordion.Item open={openRådata}>
            <Accordion.Header
              onClick={() => {
                !openRådata && loggHistorikk("Åpner rådata", loggingInfo);
                setOpenRådata(!openRådata);
              }}
            >
              Rådata
            </Accordion.Header>
            <Accordion.Content>
              <StyledPre>{JSON.stringify(props.response, null, 2)}</StyledPre>
            </Accordion.Content>
          </Accordion.Item>
        </RådataEkspanderbartPanel>

        <LangInfo infoId={infoId} />
      </StyledMain>
    </HistorikkContextProvider>
  );
}

function getTitle(dokument?: HistoriskDokument) {
  switch (dokument?._type) {
    case "deltTekst":
      return dokument.title;
    case "faktaSide":
      return dokument.title;
    default:
      return "Kunne ikke finne tittel";
  }
}
