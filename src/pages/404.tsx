import React from 'react';
import SEO from '../components/SEO';
import styled from 'styled-components/macro';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/LocaleContext';
import SideListe from '../templates/faktaside/Navigasjonsmeny/SideListe';
import { useLocation, useMount } from 'react-use';
import { loggNotFound } from '../utils/logging';

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

const NotFoundPage = () => {
  const { t } = useTranslation('global');
  const lang = useLocale();
  const path = useLocation().pathname;

  useMount(() => {
    loggNotFound(path || 'N/A');
  });

  return (
    <Style>
      <SEO title="404: Not found" description="" lang={lang} path={'/404/'} />
      <Innholdstittel>{t('404')}</Innholdstittel>
      <Normaltekst>{t('404-sub')}</Normaltekst>
      <StyledNormaltekst>{t('404-andre-sider')}</StyledNormaltekst>
      <SideListe />
    </Style>
  );
};

export default NotFoundPage;
