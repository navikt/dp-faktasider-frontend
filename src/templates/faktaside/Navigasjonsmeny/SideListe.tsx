import * as React from 'react';
import { useReducer } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import useFaktasiderSumary, { FaktasideSummary } from '../../../utils/faktasiderSummary/useFaktasiderSumary';
import Innholdsfortegnelse from '../InnholdsMeny/Innholdsfortegnelse';
import { useFaktasideContext } from '../FaktaSideContext';
import { loggMeny } from '../../../utils/logging';
import NavFrontendChevron from 'nav-frontend-chevron';
import { UnmountClosed } from 'react-collapse';

const StyledOl = styled.ol`
  margin-bottom: 3.5rem;
`;

const listeElementCommonStyling = css`
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  > *:last-child {
    transition: 0.3s;
    opacity: 0.6;
  }
  &:hover {
    background-color: #ddd8;
    > *:last-child {
      margin-right: -0.5rem;
    }
  }
  ${listeElementCommonStyling};
`;

const StyledButton = styled.button`
  ${listeElementCommonStyling};
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: start;
`;

function SideListeElement(props: { page: FaktasideSummary }) {
  const faktasideContext = useFaktasideContext();
  const [open, toggle] = useReducer((state) => !state, true);

  const currentPage = props.page.id === faktasideContext.id;

  if (currentPage) {
    return (
      <>
        <StyledButton
          onClick={() => {
            toggle();
            loggMeny('Åpne/lukke innholdsfortegnelse');
          }}
          aria-expanded={open}
        >
          <span>{props.page.tittel}</span>
          <NavFrontendChevron type={open ? 'opp' : 'ned'} />
        </StyledButton>
        <UnmountClosed isOpened={open}>
          <Innholdsfortegnelse />
        </UnmountClosed>
      </>
    );
  }

  return (
    <StyledLink className="lenke" to={props.page.path} onClick={() => loggMeny('Gå til ny side')}>
      <span>
        {props.page.tittel} {!props.page.tilgjengeligPåValgtSpråk ? `(${props.page.språk})` : ''}
      </span>
      <NavFrontendChevron type="høyre" />
    </StyledLink>
  );
}

function SideListe() {
  const otherPages = useFaktasiderSumary();

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
