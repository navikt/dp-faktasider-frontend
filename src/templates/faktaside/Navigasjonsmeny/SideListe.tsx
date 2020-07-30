import * as React from 'react';
import { useReducer } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components/macro';
import withErrorBoundary from '../../../components/withErrorBoundary';
import useFaktasiderMenuData, { MenuItemData } from '../../../hooks/graphQl/useFaktasiderMenuData';
import Innholdsfortegnelse from '../InnholdsMeny/Innholdsfortegnelse';
import { useFaktasideContext } from '../FaktaSideContext';
import { loggMeny } from '../../../utils/logging';
import { UnmountClosed } from 'react-collapse';
import { theme } from '../../../styles/theme';

const StyledOl = styled.ol`
  margin-bottom: 3.5rem;
`;

const listeElementCommonStyling = css`
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: ${theme.colors.navLysGra};
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  ${listeElementCommonStyling};
`;

const ValgtSide = styled.div`
  background-color: #f8f8f8;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.3rem;
    height: 100%;
    background-color: ${theme.colors.navLysGra};
  }
`;

const StyledButton = styled.button`
  ${listeElementCommonStyling};
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: start;
`;

function SideListeElement(props: { page: MenuItemData }) {
  const faktasideContext = useFaktasideContext();
  const [open, toggle] = useReducer((state) => !state, true);

  const currentPage = props.page.id === faktasideContext.id;

  if (currentPage) {
    return (
      <ValgtSide>
        <StyledButton
          onClick={() => {
            toggle();
            loggMeny('Åpne/lukke innholdsfortegnelse');
          }}
          aria-expanded={open}
        >
          <span>{props.page.tittel}</span>
        </StyledButton>
        <UnmountClosed isOpened={open}>
          <Innholdsfortegnelse />
        </UnmountClosed>
      </ValgtSide>
    );
  }

  return (
    <StyledLink className="lenke" to={props.page.path} onClick={() => loggMeny('Gå til ny side')}>
      <span>
        {props.page.tittel} {!props.page.tilgjengeligPåValgtSpråk ? `(${props.page.språk})` : ''}
      </span>
    </StyledLink>
  );
}

function SideListe() {
  const otherPages = useFaktasiderMenuData();

  return (
    <StyledOl>
      {otherPages.map((side) => (
        <li key={side.id}>
          <SideListeElement page={side} />
        </li>
      ))}
    </StyledOl>
  );
}

export default withErrorBoundary(SideListe, 'SideListe');
