import styled from "styled-components/macro";
import { navFrontend } from "../../styles/navFrontend";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import Revisions from "../faktaside/content/Revisions";
import React from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { AlertStripeAdvarsel, AlertStripeInfo } from "nav-frontend-alertstriper";
import { DokumentHistorikkProps } from "../../pages/historikk/[...slug]";
import DevKnapper from "../DevKnapper/DevKnapper";
import useUniqueId from "../../utils/useUniqueId";
import Lenke from "nav-frontend-lenker";
import UnderArbeid from "../veiviser/UnderArbeid";
import Head from "next/head";
import HistorikkContextProvider from "./HistorikkContext";
import DokumentRekonstruksjon from "./DokumentRekonstruksjon";
import { HistoriskDokument } from "./api/historikkFetcher";
import HistoriskDokumentMetadata from "./HistoriskDokumentMetadata";

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

function DokumentHistorikk(props: DokumentHistorikkProps) {
  const localizedDoc: HistoriskDokument | undefined = localizeSanityContent(props.response?.documents[0], "no");
  const infoId = useUniqueId("info");

  return (
    <Style>
      <Head>
        <meta name="robots" content="none" />
        <title>Historiske data | www.nav.no</title>
      </Head>
      <UnderArbeid />
      <DevKnapper />
      <div>
        <Sidetittel>Historiske data</Sidetittel>
        <Revisions revisions={props.revisions} documentId={props.id} currentRevision={localizedDoc?._updatedAt} />
      </div>

      {localizedDoc && <HistoriskDokumentMetadata dokument={localizedDoc} />}

      <AlertStripeAdvarsel>
        Dette er en automatisk rekonstruksjon og vil ikke nøyaktig gjenspeile hvordan siden ble opplevd på gjeldende
        tidspunkt. <Lenke href={`#${infoId}`}>Les mer</Lenke>
      </AlertStripeAdvarsel>

      <HistorikkContextProvider timestamp={props.time}>
        <DokumentRekonstruksjon dokument={localizedDoc} />
      </HistorikkContextProvider>

      <details>
        <summary>Rådata</summary>
        <StyledPre>{JSON.stringify(props.response, null, 2)}</StyledPre>
      </details>
      <AlertStripeInfo id={infoId}>
        <p>Mer informasjon</p>
        <p>Gammel data, ny kode</p>
        <p>Info om delte tekster</p>
        <p>Info om Custom Components</p>
        <p>Info om G-belløp</p>
        <p>Info om hvor man kan hente kode</p>
        <p>Info om å kontakte NAV hvis man trenger nøyaktig gjengivelse</p>
        <p>Info om at data er korrekt/tidsriktig</p>
        <p>Oppdateres ca en gang i døgnet</p>
      </AlertStripeInfo>
    </Style>
  );
}

export default DokumentHistorikk;
