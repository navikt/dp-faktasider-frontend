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

export const query = graphql`
  query MyQuery($id: String) {
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
}

function FaktaSide(props: Props) {
  const side = props.data.side;

  const parsedRichText = parseRichText(side._rawBody.nb);
  const bolkTitler = getBolkTitler(parsedRichText);

  return (
    <ErrorBoundary>
      <Layout header={side._rawTitle.nb} menuItems={bolkTitler}>
        <GraphQLErrorList errors={props.errors} />
        <BlockContent blocks={parsedRichText} />
      </Layout>
    </ErrorBoundary>
  );
}

export default FaktaSide;
