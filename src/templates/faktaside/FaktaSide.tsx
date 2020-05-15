import * as React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import Layout from './Layout';
import GraphQLErrorList from '../../components/GraphqlErrorList';
import { Translations } from '../../types/translations';
import parseRichText from '../../utils/richTextUtils/parseRichText';
import ErrorBoundary from '../../components/ErrorBoundary';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import { getBolkTitler } from '../../utils/richTextUtils/getBolkTitler';
import { LocaleContext, LocaleProvider } from '../../locales/LocaleContext';
import { SupportedLanguage } from '../../locales/utils';
import localize from '../../locales/localize';

export const query = graphql`
  query FaktaSide($id: String) {
    side: sanityFaktaSide(id: { eq: $id }) {
      _rawTitle
      _rawBody
    }
  }
`;

interface Props {
  data: {
    side: {
      _rawTitle: Translations<string>;
      _rawBody: Translations<SanityBlock[]>;
    };
  };
  errors: any;
  pageContext: {
    lang: SupportedLanguage;
  };
}

function FaktaSide(props: Props) {
  const side = localize(props.data.side, props.pageContext.lang);
  const parsedRichText = parseRichText(side._rawBody);
  const bolkTitler = getBolkTitler(parsedRichText);

  return (
    <ErrorBoundary>
      <Layout header={side._rawTitle} menuItems={bolkTitler}>
        <GraphQLErrorList errors={props.errors} />
        <BlockContent blocks={parsedRichText} />
      </Layout>
    </ErrorBoundary>
  );
}

export default FaktaSide;
