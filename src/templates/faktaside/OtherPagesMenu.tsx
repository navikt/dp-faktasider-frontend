import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import localizeSanityContent from '../../i18n/localizeSanityContent';
import withErrorBoundary from '../../components/withErrorBoundary';
import { useLocale } from '../../i18n/LocaleContext';
import { Translations } from '../../types/translations';
import { supportedLanguages } from '../../i18n/supportedLanguages';

const Style = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem;
  > * {
    margin: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  display: flex;
`;

interface Side {
  _rawTitle?: Translations<string>;
  _rawVisSprakversjon?: Translations<boolean>;
  id: string;
  slug?: {
    current: string;
  };
}

function OtherPagesMenu() {
  const data = useStaticQuery(graphql`
    query OtherPages {
      oppsett: sanityOppsett {
        faktasideSortering {
          id
        }
      }
      pages: allSanityFaktaSide {
        edges {
          node {
            _rawTitle
            _rawVisSprakversjon
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const lang = useLocale();
  const sorteringsMal = data?.oppsett.faktasideSortering.map((edge) => edge.id);
  const pages = data?.pages.edges.map((edge) => edge.node) as Side[];
  const sortedPages = sorteringsMal.map((id) => pages.find((it) => it.id === id));
  const unsortedPages = pages.filter((page) => !sorteringsMal.some((id) => id === page.id));

  return (
    <Style>
      {[...sortedPages, ...unsortedPages].map((page) => {
        if (!page.slug) {
          return null;
        }

        const slug = page.slug.current;
        const oversettelser = supportedLanguages.filter((lang) => page._rawVisSprakversjon?.[lang]);
        const oversatt = oversettelser.includes(lang);
        const path = oversatt ? `/${lang}/${slug}` : `/${oversettelser[0]}/${slug}`;
        const tittel = localizeSanityContent(page._rawTitle, lang);

        return (
          <StyledLink activeStyle={{ color: 'black' }} className="lenke" to={path}>
            {tittel} {!oversatt ? `(${oversettelser[0]})` : ''}
          </StyledLink>
        );
      })}
    </Style>
  );
}

export default withErrorBoundary(OtherPagesMenu, 'Meny');
