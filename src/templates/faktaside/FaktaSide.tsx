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
import { LocaleContext, LocaleProvider } from '../../locales/LocaleContext';
import localize from '../../locales/localize';
import { FaktasideProvider } from './FaktasideContext';
import { SupportedLanguage } from '../../locales/supportedLanguages';

export const query = graphql`
  query FaktaSide($id: String) {
    side: sanityFaktaSide(id: { eq: $id }) {
      _rawTitle
      _rawBody
    }
  }
`;

interface PageContext {
  lang: SupportedLanguage;
}

interface Data {
  side: {
    _rawTitle: Translations<string>;
    _rawBody: Translations<SanityBlock[]>;
  };
}

export interface FaktaSideProps extends PageProps<Data, PageContext> {
  errors: any;
}

function FaktaSide(props: FaktaSideProps) {
  const side = localize(props.data.side, props.pageContext.lang);
  const parsedRichText = parseRichText(side._rawBody);
  const bolkTitler = getBolkTitler(parsedRichText);

  return (
    <ErrorBoundary>
      <FaktasideProvider faktasideProps={props}>
        <Layout header={side._rawTitle} menuItems={bolkTitler}>
          <GraphQLErrorList errors={props.errors} />
          <BlockContent blocks={parsedRichText} />
        </Layout>
      </FaktasideProvider>
    </ErrorBoundary>
  );
}

export default FaktaSide;
