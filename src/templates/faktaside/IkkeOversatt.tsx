import * as React from 'react';
import { FaktaSideProps } from './FaktaSide';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n/supportedLanguages';

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

  const oversettelser = supportedLanguages.map((lang) => {
    const publisert = side._rawVisSprakversjon?.[lang];
    if (!publisert) {
      return null;
    }
    const tittel = side._rawTitle?.[lang];
    return (
      <li>
        <Link to={`/${lang}/${side.slug.current}`}>
          {tittel} - ({t(lang)})
        </Link>
      </li>
    );
  });

  return (
    <Style>
      <Innholdstittel>{t('ikkeOversatt')}</Innholdstittel>
      <StyledNormaltekst>{t('tilgjengeligPåAndreSpråk')}</StyledNormaltekst>
      <ul>{oversettelser}</ul>
    </Style>
  );
}

export default IkkeOversatt;
