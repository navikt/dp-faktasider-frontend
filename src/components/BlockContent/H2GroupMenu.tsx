import * as React from 'react';
import styled from 'styled-components/macro';
import useSmoothscrollOnClick from '../../hooks/useSmoothscrollOnClick';
import { idFromString } from '../../utils/routingUtils';
import { LenkeUtenUnderstrek } from '../../utils/common-styled-components';

interface Props {
  menuItems: string[];
}

const StyledLi = styled.li`
  margin: 0.4rem 0;
`;

const StyledUl = styled.ul`
  list-style: disc;
  margin-left: 1rem;
`;

function H2GroupMenu(props: Props) {
  const { SmoothScroll, activateSmoothScroll } = useSmoothscrollOnClick();

  return (
    <nav className="typo-normal">
      <SmoothScroll />
      <StyledUl>
        {props.menuItems.map((menuItem) => (
          <StyledLi key={menuItem}>
            <LenkeUtenUnderstrek onClick={activateSmoothScroll} href={'#' + idFromString(menuItem)}>
              {menuItem}
            </LenkeUtenUnderstrek>
          </StyledLi>
        ))}
      </StyledUl>
    </nav>
  );
}

export default H2GroupMenu;
