import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import useFaktasiderSumary from '../../../utils/useFaktasiderSumary';
import Innholdsfortegnelse from '../InnholdsMeny/Innholdsfortegnelse';
import { useFaktasideContext } from '../FaktaSideContext';
import { loggMeny } from '../../../utils/logging';

const StyledOl = styled.ol`
  background-color: white;
  padding: 1.5rem 0 2.5rem;
`;

const StyledLink = styled(Link)`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  &:hover {
    background-color: #ddd8;
  }
`;

function SideListe() {
  const otherPages = useFaktasiderSumary();
  const faktasideContext = useFaktasideContext();

  return (
    <StyledOl>
      {otherPages.map((page) => (
        <li key={page.id}>
          <StyledLink
            activeStyle={{ color: 'black' }}
            className="lenke"
            to={page.path}
            onClick={() => loggMeny('Gå til ny side')}
          >
            {page.tittel} {!page.tilgjengeligPåValgtSpråk ? `(${page.språk})` : ''}
          </StyledLink>
          {page.id === faktasideContext.id && <Innholdsfortegnelse />}
        </li>
      ))}
    </StyledOl>
  );
}

export default withErrorBoundary(SideListe);
