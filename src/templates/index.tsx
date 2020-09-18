import React from 'react';
import { Link, PageProps } from 'gatsby';
import styled, { css } from 'styled-components/macro';
import Header from './felles/Header';
import useFaktasiderMenuData, { MenuItemData } from '../hooks/graphQl/useFaktasiderMenuData';
import localizeSanityContent from '../i18n/localizeSanityContent';
import { useTranslation } from 'react-i18next';
import useProjectData, { ProjectData } from '../hooks/graphQl/useProjectData';
import { LandingssideProps } from '../../gatsby-utils/createLandingsside';
import SEO from '../components/SEO';
import { useLocale } from '../i18n/LocaleContext';
import { useMount } from 'react-use';
import { loggSidevisning } from '../utils/logging';
import Lenke from 'nav-frontend-lenker';
import { Systemtittel } from 'nav-frontend-typografi';
import { isDevelopment } from '../utils/environment';

const Content = styled.div`
  max-width: 50rem;
  margin: 3rem auto 4rem;
`;

const StyledListElement = styled.li`
  background-color: white;
  padding: 1.2rem 1.2rem 2rem;
  border-radius: 0.5rem;
  min-height: 8rem;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  ${StyledListElement} {
    flex: 15rem 0 0;
    margin: 0.5rem;
  }
`;

const StyledSystemtittel = styled(Systemtittel)`
  text-align: center;
  margin: 3rem 0 1rem;
`;

const lenkeStyling = css`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const InternLenke = styled(Link)`
  ${lenkeStyling};
`;

const EksternLenke = styled(Lenke)`
  ${lenkeStyling};
`;

const KunTilgjengeligStyle = styled.p`
  text-align: center;
  opacity: 0.7;
  margin: 1rem 0 !important;
`;

const IndexPage = (props: PageProps<{}, LandingssideProps>) => {
  const projectData = useProjectData();
  const sider = useFaktasiderMenuData();

  return <PureIndexPage projectData={projectData} sider={sider} path={props.location.pathname} />;
};

interface Props {
  projectData: ProjectData;
  sider: MenuItemData[];
  path: string;
}

export function PureIndexPage(props: Props) {
  const { t } = useTranslation('global');
  const lang = useLocale();
  const { ingress, title, eksterneLenker } = props.projectData;

  useMount(() => loggSidevisning('Forside - nav.no/arbeid'));

  return (
    <>
      <Header heading={localizeSanityContent(title, lang)} ingress={isDevelopment() ? ingress : ''} />
      <SEO lang={lang} description={ingress} title={title} path={props.path} />
      <Content>
        <StyledSystemtittel>Kom igang</StyledSystemtittel>
        <StyledUl>
          {eksterneLenker.map((lenke) => (
            <StyledListElement key={lenke.title}>
              <EksternLenke href={lenke.url}>{lenke.title}</EksternLenke>
              <p>{lenke.description}</p>
            </StyledListElement>
          ))}
        </StyledUl>
        <StyledSystemtittel>Informasjonssider</StyledSystemtittel>
        <StyledUl>
          {props.sider.map((side) => (
            <StyledListElement key={side.id}>
              <InternLenke to={side.path}>{side.tittel}</InternLenke>
              {!side.tilgjengeligPåValgtSpråk && (
                <KunTilgjengeligStyle>
                  ({t('kunTilgjengeligPå')} {t(side.språk)})
                </KunTilgjengeligStyle>
              )}
              <p>{side.ingress}</p>
            </StyledListElement>
          ))}
        </StyledUl>
      </Content>
    </>
  );
}

export default IndexPage;
