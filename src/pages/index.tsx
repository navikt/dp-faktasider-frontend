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
  grid-template-columns: repeat(2, minmax(15rem, 20rem));
  justify-content: center;
`;

const StyledElement = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
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
          <StyledLink to={`/no/${it.slug.current}`}>{it._rawTitle?.no}</StyledLink>
          <p>{it._rawIngress?.no}</p>
        </StyledElement>
      ))}
    </Layout>
  );
};

export default IndexPage;
