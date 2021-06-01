import { GetStaticProps } from "next";
import React from "react";
import { useLocale } from "../../i18n/useLocale";
import { sanityClient } from "../../sanity/sanity-config";
import { HistoriskFaktasideData, historiskFaktasideQuery } from "../../sanity/groq/historikk/faktasideQuery";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  data: HistoriskFaktasideData[];
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const data = await sanityClient.fetch(historiskFaktasideQuery);

  return {
    props: { data },
    revalidate: 120,
  };
};

const Style = styled.div`
  margin: 5rem auto;
  max-width: 40rem;
  > * {
    margin-bottom: 1rem;
  }
`;

export default function HistorikkIndeks(props: Props) {
  const lang = useLocale();
  const localizedFaktasider: HistoriskFaktasideData[] = localizeSanityContent(props.data, lang);
  const faktasider = localizedFaktasider.map((faktaside) => (
    <li key={faktaside._id}>
      <Link href={`/historikk/${faktaside._id}/${faktaside._updatedAt}`}>{faktaside.title}</Link>
    </li>
  ));

  return (
    <Style>
      <h1>Historikk av faktasidene</h1>
      <p>Her kan du velge mellom faktasidene, og se historiske revisjoner av dem</p>
      <ul>{faktasider}</ul>
    </Style>
  );
}
