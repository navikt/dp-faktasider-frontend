import { GetStaticPaths, GetStaticProps } from "next";
import { Revision, revisionsFetcher } from "../../sanity/revisionsFetcher";
import Revisions from "../../components/faktaside/content/Revisions";
import withErrorBoundary from "../../components/withErrorBoundary";
import styled from "styled-components/macro";
import { historicVersionFetcher, HistoricVersionResponse } from "../../sanity/historicVersionFetcher";
import { Sidetittel, Undertittel, Normaltekst } from "nav-frontend-typografi";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { navFrontend } from "../../styles/navFrontend";
import BlockContent from "../../components/BlockContent/BlockContent";
import { typografiStyle } from "../../components/faktaside/FaktaSideLayout";
import parseRichText from "../../utils/richTextUtils/parser/parseRichText";
import H2Section from "../../components/Section/H2Section";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: true,
  };
};

interface Props {
  revisions: Revision[];
  response: HistoricVersionResponse | null;
  id: string;
  time: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const [id, time] = context.params!.slug as string[];

  const revisions = await revisionsFetcher(id);
  const response = await historicVersionFetcher(id, time);

  return {
    props: {
      revisions,
      id,
      time,
      response,
    },
    revalidate: 3600,
  };
};

const Style = styled.div`
  max-width: 80rem;
  margin: auto;
  background-color: white;
  padding: 5rem 2rem;
`;

const StyledPre = styled.pre`
  font-size: 0.75rem;
  border: dashed ${navFrontend.navBlaLighten60} 0.4rem;
  padding: 1rem;
  background-color: hsl(0deg 0% 95%);
`;

const StyledRekonstruksjon = styled.main`
  box-shadow: 0 0.2rem 1rem hsl(0deg 0% 80%);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 50rem;
  background-color: hsl(0deg 0% 95%);
  ${typografiStyle};
`;

function FaktasideRekonstruksjon(props: any) {
  console.log(props);

  return (
    <>
      <Sidetittel>{props.title}</Sidetittel>
      <Normaltekst>{props.beskrivelse}</Normaltekst>
      {props.kortFortalt && (
        <H2Section title="Kort fortalt" id="kort-fortalt">
          <BlockContent blocks={props.kortFortalt} />
        </H2Section>
      )}
      /* TODO parseRichText fjerner delte tekster her, må løses */
      <BlockContent blocks={parseRichText(props.innhold)} />
    </>
  );
}

function Historikk(props: Props) {
  const localizedDoc: HistoricVersionResponse["documents"][0] = localizeSanityContent(
    props.response?.documents[0],
    "no"
  );

  return (
    <Style>
      <Sidetittel>Historiske data for {props.id}</Sidetittel>
      <p>
        NB! Dette er en automatisk rekonstruksjon og kan ikke nøyaktig gjenspeile hvordan siden ble opplevd på gjeldende
        tidspunkt.
      </p>
      <Revisions revisions={props.revisions} documentId={props.id} currentRevision={props.time} />
      <StyledRekonstruksjon>
        {localizedDoc?._type === "faktaSide" && <FaktasideRekonstruksjon {...localizedDoc} />}
      </StyledRekonstruksjon>
      <Undertittel>Rådata:</Undertittel>
      <StyledPre>{JSON.stringify(props.response, null, 2)}</StyledPre>
    </Style>
  );
}

export default withErrorBoundary(Historikk, "Historikk");
