import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import GraphQLErrorList from '../components/GraphqlErrorList';
import localizeSanityContent from '../i18n/localizeSanityContent';

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

interface Side {
  _rawIngress?: string;
  _rawTitle?: string;
  slug?: {
    current: string;
  };
}

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
  const lang = 'no';
  const sider = localizeSanityContent(
    props.data.sider.edges.map((edge) => edge.node),
    lang
  ) as Side[];

  if (props.errors) {
    return <GraphQLErrorList errors={props.errors} />;
  }

  return (
    <Layout>
      {sider.map((side) => {
        if (!side.slug || !side._rawTitle) {
          return null;
        }
        return (
          <StyledElement>
            <StyledLink to={`/${lang}/${side.slug.current}`}>{side._rawTitle}</StyledLink>
            <p>{side._rawIngress}</p>
          </StyledElement>
        );
      })}
    </Layout>
  );
};

export default IndexPage;
