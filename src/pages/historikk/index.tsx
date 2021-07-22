import { GetStaticProps } from "next";
import React from "react";
import { useLocale } from "../../i18n/useLocale";
import { sanityClient } from "../../sanity/sanity-config";
import { HistoriskFaktasideData, historiskFaktasideQuery } from "../../sanity/groq/historikk/faktasideQuery";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import Link from "next/link";
import styled from "styled-components";
import useBreadcrumbs from "../../components/faktaside/useBreadcrumbs";
import { domeneTittelQuery } from "../../sanity/groq/commonQuerries";
import { loggHistorikk } from "../../utils/logging";
import useMount from "react-use/lib/useMount";
import { BodyShort, Title } from "@navikt/ds-react";

interface Props {
  data: HistoriskFaktasideData[];
  domeneTittel: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const data = await sanityClient.fetch(historiskFaktasideQuery);
  const domeneTittel = await sanityClient.fetch(domeneTittelQuery);

  return {
    props: { data, domeneTittel },
    revalidate: 120,
  };
};

const Style = styled.div`
  margin: 2rem auto;
  max-width: 40rem;
  background-color: white;
  padding: 4rem 2rem;
  > * {
    margin-bottom: 1rem;
  }
`;

export default function HistorikkIndeks(props: Props) {
  const lang = useLocale();
  const localizedFaktasider: HistoriskFaktasideData[] = localizeSanityContent(props.data, lang);
  const faktasider = localizedFaktasider.map((faktaside) => (
    <li key={faktaside._id}>
      <Link href={`/historikk/${faktaside._id}/${faktaside._updatedAt}`} passHref>
        <a className="lenke">{faktaside.title}</a>
      </Link>
    </li>
  ));

  useMount(() => loggHistorikk("Forside sidevisning"));
  useBreadcrumbs(props.domeneTittel, [{ tittel: "Historikk", path: "historikk" }]);

  return (
    <Style>
      <main>
        <Title level="1" size="2xl">
          Historikk for {props.domeneTittel}
        </Title>
        <BodyShort>Velg mellom faktasidene og se historiske versjoner:</BodyShort>
        <ul>{faktasider}</ul>
      </main>
    </Style>
  );
}
