import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import localizeSanityContent from '../../i18n/localizeSanityContent';
import LocaleLink from '../../components/LocaleLink';
import withErrorBoundary from '../../components/withErrorBoundary';
import { useLocale } from '../../i18n/LocaleContext';

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

interface Side {
  _rawTitle?: string;
  slug?: {
    current: string;
  };
}

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

  const lang = useLocale();
  const pages = localizeSanityContent(
    data?.pages.edges.map((edge) => edge.node),
    lang
  ) as Side[];

  return (
    <Style>
      {pages.map((page) => {
        if (!page.slug) {
          return null;
        }
        return (
          <StyledLink activeStyle={{ color: 'black' }} className="lenke" to={page.slug.current}>
            {page._rawTitle}
          </StyledLink>
        );
      })}
    </Style>
  );
}

export default withErrorBoundary(OtherPagesMenu, 'Meny');
