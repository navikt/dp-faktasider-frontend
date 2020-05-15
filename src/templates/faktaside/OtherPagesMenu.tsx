import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { useLocale } from '../../locales/useLocale';
import localize from '../../locales/localize';
import LocaleLink from '../../components/LocaleLink';
import withErrorBoundary from '../../components/withErrorBoundary';

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
  const lang = useLocale();
  const localePages = localize(pages, lang);

  return (
    <OtherPagesStyle>
      {localePages.map((page) => (
        <LocaleLink to={page.slug.current}>{page._rawTitle}</LocaleLink>
      ))}
    </OtherPagesStyle>
  );
}

export default withErrorBoundary(OtherPagesMenu, 'Meny');
