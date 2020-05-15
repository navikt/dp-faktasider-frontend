import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { useLocale } from '../../locales/useLocale';
import localize from '../../locales/localize';
import LocaleLink from '../../components/LocaleLink';
import withErrorBoundary from '../../components/withErrorBoundary';

const Style = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem;
  > * {
    margin: 0.5rem;
  }
`;

const StyledLink = styled(LocaleLink)`
  font-size: 1.2rem;
  display: flex;
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
    <Style>
      {localePages.map((page) => (
        <StyledLink activeStyle={{ color: 'black' }} className="lenke" to={page.slug.current}>
          {page._rawTitle}
        </StyledLink>
      ))}
    </Style>
  );
}

export default withErrorBoundary(OtherPagesMenu, 'Meny');
