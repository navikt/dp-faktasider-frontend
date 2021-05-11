import styled from "styled-components/macro";
import { navFrontend } from "../../styles/navFrontend";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import H2Section from "../Section/H2Section";
import BlockContent from "../BlockContent/BlockContent";
import parseRichText from "../../utils/richTextUtils/parser/parseRichText";
import { HistoricVersionResponse } from "../../sanity/historicVersionFetcher";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import Revisions from "../faktaside/content/Revisions";
import React from "react";
import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import { AlertStripeAdvarsel, AlertStripeInfo } from "nav-frontend-alertstriper";
import { DokumentHistorikkProps } from "../../pages/historikk/[...slug]";
import DevKnapper from "../DevKnapper/DevKnapper";
import { format } from "date-fns";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import useUniqueId from "../../utils/useUniqueId";
import Lenke from "nav-frontend-lenker";

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

const StyledRekonstruksjon = styled.main`
  box-shadow: 0 0.2rem 2rem hsl(0deg 0% 70%);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 50rem;
  background-color: hsl(0deg 0% 95%);
  ${typografiStyle};
`;

function parseHistoriskRichText(blocks: SanityBlock[]) {
  const behandlet = blocks.map((it) =>
    it._type === "deltTekstReference" ? { ...it, _type: "historiskDeltTekst" } : it
  );
  return parseRichText(behandlet);
}

function FaktasideRekonstruksjon(props: any) {
  return (
    <StyledRekonstruksjon>
      <Sidetittel>{props.title}</Sidetittel>
      <Normaltekst>{props.beskrivelse}</Normaltekst>
      {props.kortFortalt && (
        <H2Section title="Kort fortalt" id="kort-fortalt">
          <BlockContent blocks={props.kortFortalt} />
        </H2Section>
      )}
      <BlockContent blocks={parseHistoriskRichText(props.innhold)} />
    </StyledRekonstruksjon>
  );
}

function DeltTekstRekonstruksjon(props: any) {
  return (
    <StyledRekonstruksjon>
      /* TODO, biter av teksten i delte tekster kan merkes med visPaaSide, men disse tekstene blir nok skjult nå som de
      ikke vises på en side */
      <BlockContent blocks={parseHistoriskRichText(props.innhold)} />
    </StyledRekonstruksjon>
  );
}

type Dokument = HistoricVersionResponse["documents"][0];

function getRekonstruksjon(document?: Dokument) {
  switch (document?._type) {
    case "faktaSide":
      return <FaktasideRekonstruksjon {...document} />;
    case "deltTekst":
      return <DeltTekstRekonstruksjon {...document} />;
    default:
      return "Ingen dokument valgt";
  }
}

const MetadataStyle = styled.div`
  padding: 1rem 1.5rem;
  background-color: hsl(0deg 0% 95%);
  border-radius: 0.5rem;
  font-size: 0.9rem;
`;

const Bold = styled.span`
  font-weight: 600;
`;

function Metadata(props: Dokument) {
  return (
    <MetadataStyle>
      <Undertittel>Dokument-metadata</Undertittel>
      <p>
        ID: <Bold>{props._id}</Bold>
      </p>
      <p>
        Type: <Bold>{props._type}</Bold>
      </p>
      <p>
        Tittel: <Bold>{props.title}</Bold>
      </p>
      <p>
        Sist oppdatert: <Bold>{format(new Date(props._updatedAt), "PPpp")}</Bold>
      </p>
    </MetadataStyle>
  );
}

function DokumentHistorikk(props: DokumentHistorikkProps) {
  const localizedDoc: Dokument | undefined = localizeSanityContent(props.response?.documents[0], "no");
  const infoId = useUniqueId("info");

  return (
    <Style>
      <DevKnapper />
      <div>
        <Sidetittel>Historiske data</Sidetittel>
        <Revisions revisions={props.revisions} documentId={props.id} currentRevision={localizedDoc?._updatedAt} />
      </div>

      {localizedDoc && <Metadata {...localizedDoc} />}

      <AlertStripeAdvarsel>
        Dette er en automatisk rekonstruksjon og vil ikke nøyaktig gjenspeile hvordan siden ble opplevd på gjeldende
        tidspunkt. <Lenke href={`#${infoId}`}>Les mer</Lenke>
      </AlertStripeAdvarsel>

      {getRekonstruksjon(localizedDoc)}

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
      </AlertStripeInfo>
    </Style>
  );
}

export default DokumentHistorikk;
