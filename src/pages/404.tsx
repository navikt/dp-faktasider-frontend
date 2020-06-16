import React from 'react';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import NavigasjonsMeny from '../templates/faktaside/Navigasjonsmeny/Navigasjonsmeny';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/LocaleContext';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
`;

const StyledNormaltekst = styled(Normaltekst)`
  margin: 2rem 0 0;
`;

/* TODO Ikke bruke navigasjonsmeny her */

const NotFoundPage = () => {
  const { t } = useTranslation('global');
  const lang = useLocale();

  return (
    <Style>
      <SEO title="404: Not found" description="" lang={lang} />
      <Innholdstittel>{t('404')}</Innholdstittel>
      <Normaltekst>{t('404-sub')}</Normaltekst>
      <StyledNormaltekst>{t('404-andre-sider')}</StyledNormaltekst>
      <NavigasjonsMeny />
    </Style>
  );
};

export default NotFoundPage;
