import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import GraphQLErrorList from '../components/GraphqlErrorList';

export const query = graphql`
  query AllFaktasider {
    sider: allSanityFaktaSide {
      edges {
        node {
          _rawIngress
          _rawTitle
          slug {
            current
          }
        }
      }
    }
  }
`;

const Layout = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 20rem 20rem;
  justify-content: center;
`;

const StyledElement = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const IndexPage = (props: any) => {
  const { data, errors } = props;

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const pages = data?.sider.edges.map((it) => it.node);

  return (
    <Layout>
      {pages?.map((it: any) => (
        <StyledElement>
          <Link to={`/no/${it.slug.current}`}>{it._rawTitle?.no}</Link>
          <p>{it._rawIngress?.no}</p>
        </StyledElement>
      ))}
    </Layout>
  );
};

export default IndexPage;
