import styled from "styled-components/macro";
import { navFrontend } from "../../styles/navFrontend";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { HistorikkProps } from "../../pages/historikk/[...slug]";
import useUniqueId from "../../utils/useUniqueId";
import UnderArbeid from "../veiviser/UnderArbeid";
import Head from "next/head";
import HistorikkContextProvider from "./HistorikkContext";
import DokumentRekonstruksjon from "./DokumentRekonstruksjon";
import { HistoriskDokument } from "./api/historikkFetcher";
import BlockContent from "../BlockContent/BlockContent";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useBreadcrumbs from "../faktaside/useBreadcrumbs";
import HistorikkHeader from "./HistorikkHeader";

const Style = styled.div`
  max-width: 70rem;
  margin: auto;
  background-color: white;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  --content-max-width: 50rem;
`;

const StyledPre = styled.pre`
  font-size: 0.75rem;
  border: dashed ${navFrontend.navBlaLighten60} 0.4rem;
  padding: 1rem;
  background-color: hsl(0deg 0% 95%);
`;

const LangInfoStyle = styled(AlertStripeInfo)`
  ${typografiStyle};

  h2,
  h3 {
    margin-bottom: 0.5em;
  }

  h3 {
    margin-top: 3rem;
  }
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
      <Style>
        <Head>
          <meta name="robots" content="none" />
          <title>{props.hjelpeTekster?.title} | www.nav.no</title>
        </Head>
        <UnderArbeid />
        <HistorikkHeader document={localizedDoc} revisions={props.revisions} title={documentTitle} />

        <DokumentRekonstruksjon dokument={localizedDoc} lesMerLenkeId={infoId} />

        <details>
          <summary>Rådata</summary>
          <StyledPre>{JSON.stringify(props.response, null, 2)}</StyledPre>
        </details>
        <LangInfoStyle id={infoId}>
          <BlockContent blocks={props.hjelpeTekster?.langInfo} />
        </LangInfoStyle>
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

export default Historikk;
