import React from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components/macro';
import Header from '../felles/Header';
import useFaktasiderMenuData from '../../hooks/graphQl/useFaktasiderMenuData';
import localizeSanityContent from '../../i18n/localizeSanityContent';
import useProjectData, { ProjectData } from '../../hooks/graphQl/useProjectData';
import { LandingssideProps } from '../../../gatsby-utils/createLandingsside';
import SEO from '../../components/SEO';
import { useLocale } from '../../i18n/LocaleContext';
import { useMount } from 'react-use';
import { loggSidevisning } from '../../utils/logging';
import InfosideLenker from './InfosideLenker';
import { MenuItem } from '../../hooks/graphQl/menuDataUtils';
import { KomIgangLenker } from './KomIgangLenker';
import useBreadcrumbs from '../faktaside/useBreadcrumbs';

const Content = styled.div`
  max-width: 50rem;
  margin: 3rem auto 4rem;
`;

const IndexPage = (props: PageProps<{}, LandingssideProps>) => {
  const projectData = useProjectData();
  const sider = useFaktasiderMenuData();

  return <PureIndexPage projectData={projectData} infosideLenker={sider} path={props.location.pathname} />;
};

interface Props {
  projectData: ProjectData;
  infosideLenker: MenuItem[];
  path: string;
}

export function PureIndexPage(props: Props) {
  const lang = useLocale();
  const { beskrivelse, title, komIgangLenker } = props.projectData;

  useMount(() => loggSidevisning('Forside - nav.no/arbeid'));
  useBreadcrumbs();

  return (
    <>
      <Header heading={localizeSanityContent(title, lang)} beskrivelse={beskrivelse} />
      <SEO lang={lang} description={beskrivelse} title={title} path={props.path} />
      <Content>
        <InfosideLenker lenker={props.infosideLenker} />
        <KomIgangLenker komIgangLenker={komIgangLenker} />
      </Content>
    </>
  );
}

export default IndexPage;
