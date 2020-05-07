import * as React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import Layout from './Layout';
import GraphQLErrorList from '../../components/GraphqlErrorList';
import { Translations } from '../../types/translations';
import parseRichText from '../../utils/parseRichText';
import ErrorBoundary from '../../components/ErrorBoundary';

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
      _rawTitle: Translations;
      _rawBody: Translations;
    };
  };
  errors: any;
}

function FaktaSide(props: Props) {
  const side = props.data.side;

  const richText = parseRichText(side._rawBody.nb);

  console.log(richText);

  return (
    <ErrorBoundary>
      <Layout header={side._rawTitle.nb} menuItems={[]}>
        <GraphQLErrorList errors={props.errors} />
        <BlockContent blocks={richText} />
      </Layout>
    </ErrorBoundary>
  );
}

export default FaktaSide;
