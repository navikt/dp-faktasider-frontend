import * as React from 'react';
import { useRef } from 'react';
import { PageProps } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import FaktaSideLayout from './FaktaSideLayout';
import GraphQLErrorList from '../../components/GraphqlErrorList';
import SEO from '../../components/SEO';
import IkkeOversatt from './IkkeOversatt';
import RelatertInformasjon from './RelatertInformasjon';
import { FaktasideProvider } from './FaktaSideContext';
import { FaktasideContext } from '../../../gatsby-utils/createFaktasider';
import withErrorBoundary from '../../components/withErrorBoundary';
import { useMount } from 'react-use';
import { loggSidevisning } from '../../utils/logging';
import InnholdetErTilpasset from './InnholdsMeny/InnholdetErTilpasset';
import useLoggUtdatertHashlenke from './useLoggUtdatertHashlenke';
import KortFortalt from './KortFortalt';

export interface FaktaSideProps extends PageProps<{}, FaktasideContext> {
  errors: any;
}

function FaktaSide(props: FaktaSideProps) {
  const page = props.pageContext;
  const lang = page.lang;
  const erPublisert = page.visSprakversjon?.[lang];
  const tittel = page.title || '';
  const contentRef = useRef<HTMLDivElement>(null);

  useMount(() => loggSidevisning(tittel));
  useLoggUtdatertHashlenke();

  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  const description = page.ingress || '';

  const parsedInnhold = page.innhold;
  return (
    <FaktasideProvider {...page}>
      <SEO title={tittel} description={description} lang={lang} path={props.location.pathname} />
      <FaktaSideLayout header={tittel} ingress={description} publiseringsTidspunkt={page.publiseringsTidspunkt}>
        <GraphQLErrorList errors={props.errors} />
        <InnholdetErTilpasset contentRef={contentRef} />
        <div ref={contentRef}>
          <KortFortalt blocks={props.pageContext.kortFortalt} />
          <BlockContent blocks={parsedInnhold} />
          <RelatertInformasjon blocks={page.relatertInformasjon} />
        </div>
      </FaktaSideLayout>
    </FaktasideProvider>
  );
}

export default withErrorBoundary(FaktaSide, 'FaktaSide');
