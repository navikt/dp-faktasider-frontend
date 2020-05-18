import * as React from 'react';
import { FaktaSideProps } from './FaktaSide';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Innholdstittel } from 'nav-frontend-typografi';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
`;

function IkkeOversatt(props: FaktaSideProps) {
  const side = props.data.side;

  const no = { lang: 'no', tittel: side._rawTitle?.no };
  const en = { lang: 'en', tittel: side._rawTitle?.en };

  const oversettelser = [no, en]
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
