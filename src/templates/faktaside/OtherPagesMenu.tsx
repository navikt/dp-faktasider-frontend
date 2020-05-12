import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { getTranslation, useLocale } from '../../locales/utils';
import useLocalize from '../../locales/useLocalize';

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
            _rawTitle
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const pages = data?.pages.edges.map((edge) => edge.node);
  const localizedPages = useLocalize(pages);
  const lang = useLocale();

  return (
    <OtherPagesStyle>
      {localizedPages.map((page) => (
        <Link to={`/${lang}/${page.slug.current}`}>{page._rawTitle}</Link>
      ))}
    </OtherPagesStyle>
  );
}

export default OtherPagesMenu;
