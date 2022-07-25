import React from "react";
import H2Section from "../Section/H2Section";
import { SanityContent } from "../sanity-content/SanityContent";
import { typografiStyle } from "../faktaside/FaktaSideLayout";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import parseRichText from "../../utils/richTextUtils/parser/parseRichText";
import { HistoriskDokument } from "./api/historikkFetcher";
import styled from "styled-components";
import useUniqueId from "../../utils/useUniqueId";
import { Alert, BodyShort, Heading, Link } from "@navikt/ds-react";
import { useHistorikkContext } from "./HistorikkContext";

const RekonstruksjonWrapper = styled.article`
  box-shadow: 0 0.2rem 2rem hsl(0deg 0% 70%);
  padding: min(3vw, 2rem);
  margin: 2rem auto;
  background-color: hsl(0deg 0% 95%);
  ${typografiStyle};
`;

const StyledAlertstripe = styled(Alert).attrs({ variant: "warning" })`
  margin-bottom: 2rem;
`;

export function DokumentRekonstruksjon(props: { dokument?: HistoriskDokument; lesMerLenkeId: string }) {
  const Component = getComponent(props.dokument?._type);
  const id = useUniqueId("rekonstruksjon");
  const hjelpetekster = useHistorikkContext().hjelpeTekster;

  if (Component === undefined || !props.dokument) {
    return <Alert variant="warning">Kunne ikke gjennskape dokumentet</Alert>;
  }

  return (
    <RekonstruksjonWrapper aria-labelledby={id}>
      <h1 className="sr-only" id={id}>
        Rekonstruksjon
      </h1>
      <StyledAlertstripe>
        {hjelpetekster?.kortInfo} <Link href={`#${props.lesMerLenkeId}`}>Les mer</Link>
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
      <Heading level="1" size="xlarge">
        {props.title}
      </Heading>
      <BodyShort>{props.beskrivelse}</BodyShort>
      {props.kortFortalt && (
        <H2Section title="Kort fortalt" id="kort-fortalt">
          <SanityContent blocks={props.kortFortalt} />
        </H2Section>
      )}
      <SanityContent blocks={parseHistoriskRichText(props.innhold)} />
    </>
  );
}

function DeltTekstRekonstruksjon(props: HistoriskDokument) {
  return <SanityContent blocks={parseHistoriskRichText(props.innhold)} />;
}

function parseHistoriskRichText(blocks?: SanityBlock[]) {
  const behandlet = blocks?.map((it) =>
    it._type === "deltTekstReference" ? { ...it, _type: "historiskDeltTekst" } : it
  );
  return parseRichText(behandlet);
}
