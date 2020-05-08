import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const OtherPagesStyle = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  margin-right: 1rem;
  > * {
    padding: 0.5rem 1rem;
    border-bottom: 0.2rem solid #8888;
  }
`;

function OtherPagesMenu() {
  const data = useStaticQuery(graphql`
    query OtherPages {
      pages: allSanityFaktaSide {
        edges {
          node {
            title {
              nb
            }
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const pages = data?.pages.edges.map((edge) => edge.node);

  return (
    <OtherPagesStyle>
      {pages.map((page) => (
        <Link to={page.slug.current}>{page.title.nb}</Link>
      ))}
    </OtherPagesStyle>
  );
}

export default OtherPagesMenu;
