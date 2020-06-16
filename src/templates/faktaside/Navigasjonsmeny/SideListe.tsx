import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import useFaktasiderSumary from '../../../utils/useFaktasiderSumary';
import InnholdsMeny from '../InnholdsMeny/InnholdsMeny';

interface Props {
  menuItems?: string[];
  faktasideId: string;
}

const LinkWrapper = styled.li``;

const StyledLink = styled(Link)`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  text-decoration: none;
  &:hover {
    background-color: #ddd8;
  }
`;

function SideListe(props: Props) {
  const otherPages = useFaktasiderSumary();

  return (
    <ol>
      {otherPages.map((page) => (
        <LinkWrapper>
          <StyledLink activeStyle={{ color: 'black' }} className="lenke" to={page.path}>
            {page.tittel} {!page.tilgjengeligPåValgtSpråk ? `(${page.språk})` : ''}
          </StyledLink>
          {page.id === props.faktasideId && <InnholdsMeny menuItems={props.menuItems || []} />}
        </LinkWrapper>
      ))}
    </ol>
  );
}

export default withErrorBoundary(SideListe, 'SideListe');
