import * as React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import Layout from './Layout';
import GraphQLErrorList from '../../components/GraphqlErrorList';

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
      _rawTitle: any;
      _rawBody: any;
    };
  };
  errors: any;
}

function FaktaSide(props: Props) {
  const side = props.data.side;

  return (
    <Layout header="Tittel" menuItems={[]}>
      <GraphQLErrorList errors={props.errors} />
      <BlockContent blocks={side?._rawBody} />
    </Layout>
  );
}

export default FaktaSide;
