import * as React from 'react';
import { FaktaSideProps } from './FaktaSide';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n/supportedLanguages';
import FaktaSideLayout from './FaktaSideLayout';
import { FaktasideProvider } from './FaktasideContext';
import localizeSanityContent from '../../i18n/localizeSanityContent';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 30vh;
`;

const StyledUl = styled.ul`
  list-style: none !important;
`;

const StyledNormaltekst = styled(Normaltekst)`
  margin: 2rem 0 0 !important;
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

  const title = localizeSanityContent(props.data.side._rawTitle, props.pageContext.lang);
  const ingress = localizeSanityContent(props.data.side._rawIngress, props.pageContext.lang);

  return (
    <FaktasideProvider faktasideProps={props}>
      <FaktaSideLayout header={title} ingress={ingress}>
        <Style>
          <Innholdstittel>{t('ikkeOversatt')}</Innholdstittel>
          {oversettelser.length && (
            <>
              <StyledNormaltekst>{t('tilgjengeligPåAndreSpråk')}</StyledNormaltekst>
              <StyledUl>{oversettelser}</StyledUl>
            </>
          )}
        </Style>
      </FaktaSideLayout>
    </FaktasideProvider>
  );
}

export default IkkeOversatt;
