import H2Section from "../Section/H2Section";
import BlockContent from "../BlockContent/BlockContent";
import React from "react";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import parseRichText from "../../utils/richTextUtils/parser/parseRichText";
import { HistoriskDokument } from "./api/historikkFetcher";
import styled from "styled-components/macro";

const RekonstruksjonWrapper = styled.article`
  box-shadow: 0 0.2rem 2rem hsl(0deg 0% 70%);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 50rem;
  background-color: hsl(0deg 0% 95%);
  ${typografiStyle};
`;

function DokumentRekonstruksjon(props: { dokument?: HistoriskDokument }) {
  const Component = getComponent(props.dokument?._type);

  if (Component === undefined || !props.dokument) {
    // TODO, denne stemmer kanskje ikke alltid?
    return <>Ingen dokument valgt</>;
  }

  return (
    <RekonstruksjonWrapper>
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
  return (
    <>
      /* TODO, biter av teksten i delte tekster kan merkes med visPaaSide, men disse tekstene blir nok skjult nå som de
      ikke vises på en side */
      <BlockContent blocks={parseHistoriskRichText(props.innhold)} />
    </>
  );
}

function parseHistoriskRichText(blocks: SanityBlock[]) {
  const behandlet = blocks.map((it) =>
    it._type === "deltTekstReference" ? { ...it, _type: "historiskDeltTekst" } : it
  );
  return parseRichText(behandlet);
}

export default DokumentRekonstruksjon;