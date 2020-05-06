import * as React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '../components/BlockContent/BlockContent';

export const query = graphql`
  query MyQuery($id: String) {
    side: sanityFaktaSide(id: { eq: $id }) {
      _rawTitle
      _rawBody
    }
  }
`;

const Page = (props) => {
  const side = props.data.side;

  return <BlockContent blocks={side?._rawBody} />;
};

export default Page;
