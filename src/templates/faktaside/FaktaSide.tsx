import * as React from 'react';
import { GatsbyNode, graphql, PageProps } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import Layout from './Layout';
import GraphQLErrorList from '../../components/GraphqlErrorList';
import { Translations } from '../../types/translations';
import parseRichText from '../../utils/richTextUtils/parseRichText';
import ErrorBoundary from '../../components/ErrorBoundary';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import { getBolkTitler } from '../../utils/richTextUtils/getBolkTitler';
import localize from '../../locales/localize';
import { FaktasideProvider } from './FaktasideContext';
import { SupportedLanguage } from '../../locales/supportedLanguages';
import SEO from '../../components/SEO';
import IkkeOversatt from './IkkeOversatt';

export const query = graphql`
  query FaktaSide($id: String) {
    side: sanityFaktaSide(id: { eq: $id }) {
      _rawTitle
      _rawInnhold
      _rawIngress
      slug {
        current
      }
      publisert {
        en
        no
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
    _rawTitle?: Translations<string>;
    _rawInnhold?: Translations<SanityBlock[]>;
    _rawIngress?: Translations<string>;
    slug: {
      current: string;
    };
    publisert: {
      en: boolean;
      no: boolean;
    };
  };
}

export interface FaktaSideProps extends PageProps<FaktaSideData, PageContext> {
  errors: any;
}

function FaktaSide(props: FaktaSideProps) {
  const lang = props.pageContext.lang;
  const erPublisert = props.data.side.publisert[lang];

  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  const side = localize(props.data.side, lang);
  const parsedRichText = parseRichText(side._rawInnhold);
  const bolkTitler = getBolkTitler(parsedRichText);

  const tittel = side._rawTitle;
  const description = side._rawIngress;

  return (
    <ErrorBoundary>
      <SEO title={tittel} description={description} lang={lang} />
      <FaktasideProvider faktasideProps={props}>
        <Layout header={tittel} menuItems={bolkTitler} ingress={description}>
          <GraphQLErrorList errors={props.errors} />
          <BlockContent blocks={parsedRichText} />
        </Layout>
      </FaktasideProvider>
    </ErrorBoundary>
  );
}

export default FaktaSide;
