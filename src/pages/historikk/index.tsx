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

  useBreadcrumbs(props.domeneTittel, [{ tittel: "Historikk", path: "historikk" }]);

  return (
    <Style>
      <h1>Historikk for {props.domeneTittel}</h1>
      <p>Velg mellom faktasidene og se historiske versjoner:</p>
      <ul>{faktasider}</ul>
    </Style>
  );
}
