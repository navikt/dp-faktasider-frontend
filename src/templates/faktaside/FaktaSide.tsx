import * as React from 'react';
import { PageProps } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import FaktaSideLayout from './FaktaSideLayout';
import GraphQLErrorList from '../../components/GraphqlErrorList';
import ErrorBoundary from '../../components/ErrorBoundary';
import SEO from '../../components/SEO';
import IkkeOversatt from './IkkeOversatt';
import { SistOppdatert } from './SistOppdatert';
import RelatertInformasjon from './RelatertInformasjon';
import { FaktasideProvider } from './FaktaSideContext';
import { FaktasideContext } from '../../../gatsby-utils/createFaktasider';

export interface FaktaSideProps extends PageProps<{}, FaktasideContext> {
  errors: any;
}

function FaktaSide(props: FaktaSideProps) {
  const page = props.pageContext;
  const lang = page.lang;
  const erPublisert = page.visSprakversjon?.[lang];

  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  const tittel = page.title || '';
  const description = page.ingress || '';

  const parsedInnhold = page.innhold;
  return (
    <ErrorBoundary boundaryName="Faktaside">
      <FaktasideProvider {...page}>
        <SEO title={tittel} description={description} lang={lang} />
        <FaktaSideLayout header={tittel} ingress={description}>
          <GraphQLErrorList errors={props.errors} />
          <SistOppdatert publiseringsTidspunkt={page.publiseringsTidspunkt} />
          <BlockContent blocks={parsedInnhold} />
          <RelatertInformasjon blocks={page.relatertInformasjon} />
        </FaktaSideLayout>
      </FaktasideProvider>
    </ErrorBoundary>
  );
}

export default FaktaSide;
