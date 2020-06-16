import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import useFaktasiderSumary from '../../../utils/useFaktasiderSumary';
import InnholdsMeny from '../InnholdsMeny/InnholdsMeny';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';

interface Props {
  menuItems?: string[];
  faktasideId: string;
}

const Style = styled.nav<{ offsetTop: number }>`
  position: sticky;
  top: calc(${(props) => props.offsetTop}px);
  max-height: calc(100vh - ${(props) => props.offsetTop}px);
  overflow-y: auto;
  transition: top 0.2s, max-height 0.2s;
  background-color: white;
`;

const LinkWrapper = styled.div`
  border-bottom: #8888 solid 0.05rem;
`;

const StyledLink = styled(Link)`
  display: block;
  font-size: 1.2rem;
  padding: 0.5rem;
  text-decoration: none;
  &:hover {
    background-color: #ddd8;
  }
`;

function Navigasjonsmeny(props: Props) {
  const otherPages = useFaktasiderSumary();
  const offsetTop = useDekoratorPopdownOffset();

  return (
    <Style offsetTop={offsetTop}>
      {otherPages.map((page) => (
        <LinkWrapper>
          <StyledLink activeStyle={{ color: 'black' }} className="lenke" to={page.path}>
            {page.tittel} {!page.tilgjengeligPåValgtSpråk ? `(${page.språk})` : ''}
          </StyledLink>
          {page.id === props.faktasideId && <InnholdsMeny menuItems={props.menuItems || []} />}
        </LinkWrapper>
      ))}
    </Style>
  );
}

export default withErrorBoundary(Navigasjonsmeny, 'Meny');
