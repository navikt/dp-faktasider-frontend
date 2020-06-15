import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import withErrorBoundary from '../../components/withErrorBoundary';
import useFaktasiderSumary from '../../utils/useFaktasiderSumary';

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

function OtherPagesMenu() {
  const otherPages = useFaktasiderSumary();

  return (
    <Style>
      {otherPages.map((page) => {
        return (
          <StyledLink activeStyle={{ color: 'black' }} className="lenke" to={page.path}>
            {page.tittel} {!page.tilgjengeligPåValgtSpråk ? `(${page.språk})` : ''}
          </StyledLink>
        );
      })}
    </Style>
  );
}

export default withErrorBoundary(OtherPagesMenu, 'Meny');
