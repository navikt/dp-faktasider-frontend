import * as React from 'react';
import { FaktaSideProps } from './FaktaSide';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Innholdstittel } from 'nav-frontend-typografi';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
`;

function IkkeOversatt(props: FaktaSideProps) {
  const side = props.data.side;

  const nb = { lang: 'nb', tittel: side._rawTitle.nb };
  const en = { lang: 'en', tittel: side._rawTitle.en };

  const oversettelser = [nb, en]
    .filter((it) => it.tittel)
    .map((it) => (
      <li>
        <Link to={`/${it.lang}/${side.slug.current}`}>
          {it.tittel} ({it.lang})
        </Link>
      </li>
    ));

  return (
    <Style>
      <Innholdstittel>Denne siden er ikke oversatt til {props.pageContext.lang}</Innholdstittel>
      <ul>{oversettelser}</ul>
    </Style>
  );
}

export default IkkeOversatt;
