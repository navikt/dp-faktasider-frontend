import React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';

export const query = graphql`
  query MyQuery($id: String) {
    sanityFaktaSide(id: { eq: $id }) {
      _rawTitle
      _rawBody
    }
  }
`;

const Page = (props) => {
  console.log(props.data.sanityFaktaSide);
  return (
    <BlockContent
      blocks={props.data.sanityFaktaSide._rawBody}
      serializers={{
        types: {
          localeRichText: (props) => <BlockContent blocks={props.nb} />,
        },
      }}
    />
  );
};

export default Page;
