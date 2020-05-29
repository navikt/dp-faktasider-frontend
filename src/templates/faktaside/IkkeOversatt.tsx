import * as React from 'react';
import { FaktaSideData, FaktaSideProps } from './FaktaSide';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
`;

const StyledNormaltekst = styled(Normaltekst)`
  margin: 1rem 0;
`;

function IkkeOversatt(props: FaktaSideProps) {
  const side = props.data.side;
  const { t } = useTranslation('global');

  const no = { lang: 'no', tittel: side._rawTitle?.no };
  const en = { lang: 'en', tittel: side._rawTitle?.en };

  const oversettelser = [no, en]
    .filter((it) => it.tittel)
    .map((it) => (
      <li>
        <Link to={`/${it.lang}/${side.slug.current}`}>
          {it.tittel} - ({t(it.lang)})
        </Link>
      </li>
    ));

  return (
    <Style>
      <Innholdstittel>{t('ikkeOversatt')}</Innholdstittel>
      <StyledNormaltekst>{t('tilgjengeligPåAndreSpråk')}</StyledNormaltekst>
      <ul>{oversettelser}</ul>
    </Style>
  );
}

export default IkkeOversatt;
