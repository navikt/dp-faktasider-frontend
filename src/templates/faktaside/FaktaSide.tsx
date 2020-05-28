import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import Layout from './Layout';
import GraphQLErrorList from '../../components/GraphqlErrorList';
import parseRichText from '../../utils/richTextUtils/parseRichText';
import ErrorBoundary from '../../components/ErrorBoundary';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import { getBolkTitler } from '../../utils/richTextUtils/getBolkTitler';
import localizeSanityContent from '../../i18n/localizeSanityContent';
import { FaktasideProvider } from './FaktasideContext';
import { SupportedLanguage } from '../../i18n/supportedLanguages';
import SEO from '../../components/SEO';
import IkkeOversatt from './IkkeOversatt';
import { SistOppdatert } from './SistOppdatert';
import RelatertInformasjon from './RelatertInformasjon';
import { Translations } from '../../types/translations';

export const query = graphql`
  query FaktaSide($id: String) {
    side: sanityFaktaSide(id: { eq: $id }) {
      _rawTitle
      _rawInnhold
      _rawIngress
      _rawSistOppdatert
      _rawRelatertInformasjon
      _rawPublisert
      slug {
        current
      }
    }
  }
`;

interface PageContext {
  lang: SupportedLanguage;
  id: string;
}

export interface FaktaSideData {
  side: {
    _rawTitle?: string;
    _rawInnhold?: SanityBlock[];
    _rawIngress?: string;
    _rawSistOppdatert?: string;
    _rawRelatertInformasjon?: SanityBlock[];
    _rawPublisert?: Translations<boolean>;
    slug: {
      current: string;
    };
  };
}

export interface FaktaSideProps extends PageProps<FaktaSideData, PageContext> {
  errors: any;
}

function FaktaSide(props: FaktaSideProps) {
  const lang = props.pageContext.lang;
  const data = localizeSanityContent(props.data, lang) as FaktaSideData;

  const erPublisert = props.data.side._rawPublisert?.[lang];
  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  const parsedRichText = parseRichText(data.side._rawInnhold);
  const bolkTitler = getBolkTitler(parsedRichText, data.side._rawRelatertInformasjon);

  const tittel = data.side._rawTitle || '';
  const description = data.side._rawIngress || '';

  return (
    <ErrorBoundary>
      <SEO title={tittel} description={description} lang={lang} />
      <FaktasideProvider faktasideProps={props}>
        <Layout header={tittel} menuItems={bolkTitler} ingress={description}>
          <GraphQLErrorList errors={props.errors} />
          <SistOppdatert>{data.side._rawSistOppdatert}</SistOppdatert>
          <BlockContent blocks={parsedRichText} />
          <RelatertInformasjon blocks={data.side._rawRelatertInformasjon} />
        </Layout>
      </FaktasideProvider>
    </ErrorBoundary>
  );
}

export default FaktaSide;
