import styled from "styled-components/macro";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import React from "react";
import { HistorikkProps } from "../../pages/historikk/[...slug]";
import useUniqueId from "../../utils/useUniqueId";
import UnderArbeid from "../veiviser/UnderArbeid";
import Head from "next/head";
import HistorikkContextProvider from "./HistorikkContext";
import DokumentRekonstruksjon from "./DokumentRekonstruksjon";
import { HistoriskDokument } from "./api/historikkFetcher";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useBreadcrumbs from "../faktaside/useBreadcrumbs";
import HistorikkHeader from "./HistorikkHeader";
import withErrorBoundary from "../withErrorBoundary";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel/lib/index";
import LangInfo from "./LangInfo";

const Style = styled.div`
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

const RådataEkspanderbartPanel = styled(Ekspanderbartpanel)`
  .ekspanderbartPanel__innhold {
    background-color: #efefef;
  }
`;

const StyledPre = styled.pre`
  font-size: 0.75rem;
  white-space: break-spaces;
  word-break: break-word;
`;

function Historikk(props: HistorikkProps) {
  const localizedDoc: HistoriskDokument | undefined = localizeSanityContent(props.response?.documents[0], "no");
  const infoId = useUniqueId("info");
  const documentTitle = getTitle(localizedDoc);

  useMount(() => loggSidevisning("Historikk"));
  useBreadcrumbs(props.domeneTittel, [
    { tittel: "Historikk", path: "historikk" },
    { tittel: documentTitle, path: `historikk/${localizedDoc?._id}/${localizedDoc?._updatedAt}` },
  ]);

  return (
    <HistorikkContextProvider timestamp={props.request.time} hjelpeTekster={props.hjelpeTekster} isHistorikk={true}>
      <UnderArbeid />
      <Head>
        <meta name="robots" content="none" />
        <title>{props.hjelpeTekster?.title} | www.nav.no</title>
      </Head>
      <Style>
        <HistorikkHeader document={localizedDoc} revisions={props.revisions} title={documentTitle} />

        <DokumentRekonstruksjon dokument={localizedDoc} lesMerLenkeId={infoId} />

        <RådataEkspanderbartPanel tittel="Rådata">
          <StyledPre>{JSON.stringify(props.response, null, 2)}</StyledPre>
        </RådataEkspanderbartPanel>

        <LangInfo infoId={infoId} />
      </Style>
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
      return "Ingen dokument valgt";
  }
}

export default withErrorBoundary(Historikk, "Historikk");
