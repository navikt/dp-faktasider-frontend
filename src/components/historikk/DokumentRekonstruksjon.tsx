import H2Section from "../Section/H2Section";
import BlockContent from "../BlockContent/BlockContent";
import React from "react";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import parseRichText from "../../utils/richTextUtils/parser/parseRichText";
import { HistoriskDokument } from "./api/historikkFetcher";
import styled from "styled-components/macro";
import useUniqueId from "../../utils/useUniqueId";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import Lenke from "nav-frontend-lenker";
import { useHistorikkContext } from "./HistorikkContext";
import withErrorBoundary from "../withErrorBoundary";

const RekonstruksjonWrapper = styled.article`
  box-shadow: 0 0.2rem 2rem hsl(0deg 0% 70%);
  padding: 2rem;
  margin: 2rem auto;
  background-color: hsl(0deg 0% 95%);
  ${typografiStyle};
`;

const StyledAlertstripe = styled(AlertStripeAdvarsel)`
  margin-bottom: 2rem;
`;

function DokumentRekonstruksjon(props: { dokument?: HistoriskDokument; lesMerLenkeId: string }) {
  const Component = getComponent(props.dokument?._type);
  const id = useUniqueId("rekonstruksjon");
  const hjelpetekster = useHistorikkContext().hjelpeTekster;

  if (Component === undefined || !props.dokument) {
    // TODO, denne stemmer kanskje ikke alltid?
    return <>Ingen dokument valgt</>;
  }

  return (
    <RekonstruksjonWrapper aria-labelledby={id}>
      <h1 className="sr-only" id={id}>
        Rekonstruksjon
      </h1>
      <StyledAlertstripe>
        {hjelpetekster?.kortInfo} <Lenke href={`#${props.lesMerLenkeId}`}>Les mer</Lenke>
      </StyledAlertstripe>
      <Component {...props.dokument} />
    </RekonstruksjonWrapper>
  );
}

function getComponent(type?: string) {
  switch (type) {
    case "faktaSide":
      return FaktasideRekonstruksjon;
    case "deltTekst":
      return DeltTekstRekonstruksjon;
    default:
      return undefined;
  }
}

function FaktasideRekonstruksjon(props: HistoriskDokument) {
  return (
    <>
      <Sidetittel>{props.title}</Sidetittel>
      <Normaltekst>{props.beskrivelse}</Normaltekst>
      {props.kortFortalt && (
        <H2Section title="Kort fortalt" id="kort-fortalt">
          <BlockContent blocks={props.kortFortalt} />
        </H2Section>
      )}
      <BlockContent blocks={parseHistoriskRichText(props.innhold)} />
    </>
  );
}

function DeltTekstRekonstruksjon(props: HistoriskDokument) {
  return <BlockContent blocks={parseHistoriskRichText(props.innhold)} />;
}

function parseHistoriskRichText(blocks?: SanityBlock[]) {
  const behandlet = blocks?.map((it) =>
    it._type === "deltTekstReference" ? { ...it, _type: "historiskDeltTekst" } : it
  );
  return parseRichText(behandlet);
}

export default withErrorBoundary(DokumentRekonstruksjon, "DokumentRekonstruksjon");
