import React from 'react';
import styled from 'styled-components/macro';
import fetchProjectData, { ProjectData } from '../hooks/graphQl/fetchProjectData';
import { MenuItem } from '../hooks/graphQl/menuDataUtils';
import { theme } from '../styles/theme';
import DevKnapper from '../components/DevKnapper/DevKnapper';
import { sanityClient } from '../../sanity/sanity-config';
import { groq } from 'next-sanity';
import Header from '../templates/felles/Header';

// @ts-ignore
const Style = styled.div`
  background-color: ${theme.colors.bakgrunn};
`;

// @ts-ignore
const Content = styled.main`
  > * {
    margin-left: auto;
    margin-right: auto;
  }
`;


interface Props {
  projectData: ProjectData;
  infosideLenker: MenuItem[];
}

export async function getStaticProps(context): Promise<{ props: Props }> {
  const projectData = await fetchProjectData("no")
  console.log(projectData);
  return {
    props: {
      // @ts-ignore
      projectData, infosideLenker: null
    } // will be passed to the page component as props
  };
}

export default function IndexPage(props: Props) {
  console.log(props);
  /*  const lang = useLocale();
    const { beskrivelse, title, komIgangLenker } = props.projectData;

    useMount(() => loggSidevisning("Forside - nav.no/arbeid"));
    useBreadcrumbs();*/
  return (
    <Style>
      <DevKnapper/>
       <Header heading={props.projectData.title} beskrivelse={props.projectData.beskrivelse} />
      {/*<SEO lang={lang} description={beskrivelse} title={title} path={props.path} />
        <Content>
          <Notifikasjoner notifikasjoner={props.projectData.forsideNotifikasjoner} />
          <InfosideLenker lenker={props.infosideLenker} />
          <Snarveier snarveier={komIgangLenker} />
        </Content>*/}
    </Style>
  );
}

