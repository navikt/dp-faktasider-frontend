import styled from "styled-components/macro";
import { navFrontend } from "../../styles/navFrontend";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import Revisions from "../faktaside/content/Revisions";
import React from "react";
import { Sidetittel, Undertittel } from "nav-frontend-typografi";
import { AlertStripeAdvarsel, AlertStripeInfo } from "nav-frontend-alertstriper";
import { HistorikkProps } from "../../pages/historikk/[...slug]";
import useUniqueId from "../../utils/useUniqueId";
import Lenke from "nav-frontend-lenker";
import UnderArbeid from "../veiviser/UnderArbeid";
import Head from "next/head";
import HistorikkContextProvider from "./HistorikkContext";
import DokumentRekonstruksjon from "./DokumentRekonstruksjon";
import { HistoriskDokument } from "./api/historikkFetcher";
import HistoriskDokumentMetadata from "./HistoriskDokumentMetadata";
import { formaterDato } from "../../utils/formaterDato";
import BlockContent from "../BlockContent/BlockContent";
import { typografiStyle } from "../faktaside/FaktaSideLayout";

const Style = styled.div`
  max-width: 80rem;
  margin: auto;
  background-color: white;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledPre = styled.pre`
  font-size: 0.75rem;
  border: dashed ${navFrontend.navBlaLighten60} 0.4rem;
  padding: 1rem;
  background-color: hsl(0deg 0% 95%);
`;

const SidetittelStyle = styled(Undertittel)`
  opacity: 0.8;
  text-transform: uppercase;
  font-size: 1.5rem;
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

  return (
    <Style>
      <Head>
        <meta name="robots" content="none" />
        <title>{props.hjelpeTekster?.title} | www.nav.no</title>
      </Head>
      <UnderArbeid />
      <div>
        <Sidetittel>{props.hjelpeTekster?.title}</Sidetittel>
        <SidetittelStyle>{getTitle(localizedDoc)}</SidetittelStyle>
        {localizedDoc && <time>{formaterDato(localizedDoc._updatedAt)}</time>}
        <Revisions revisions={props.revisions} documentId={props.request.id} currentRevision={localizedDoc?._rev} />
      </div>

      <AlertStripeAdvarsel>
        {props.hjelpeTekster?.kortInfo} <Lenke href={`#${infoId}`}>Les mer</Lenke>
      </AlertStripeAdvarsel>

      <HistorikkContextProvider timestamp={props.request.time} hjelpeTekster={props.hjelpeTekster} isHistorikk={true}>

        <DokumentRekonstruksjon dokument={localizedDoc} />
      </HistorikkContextProvider>

      {localizedDoc && <HistoriskDokumentMetadata dokument={localizedDoc} />}

      <details>
        <summary>Rådata</summary>
        <StyledPre>{JSON.stringify(props.response, null, 2)}</StyledPre>
      </details>
      <LangInfoStyle id={infoId}>
        <BlockContent blocks={props.hjelpeTekster?.langInfo} />
      </LangInfoStyle>
    </Style>
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
