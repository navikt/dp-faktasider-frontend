import * as React from 'react';
import styled from 'styled-components/macro';
import useSmoothscrollOnClick from '../../hooks/useSmoothscrollOnClick';
import { LenkeUtenUnderstrek } from '../../utils/common-styled-components';
import { Group } from '../../utils/richTextUtils/richTextTypes';

interface Props {
  underGrupper: Group[];
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
        {props.underGrupper.map((underGruppe) => (
          <StyledLi key={underGruppe.blockConfig?.id}>
            <LenkeUtenUnderstrek onClick={activateSmoothScroll} href={'#' + underGruppe.blockConfig?.id}>
              {underGruppe.title}
            </LenkeUtenUnderstrek>
          </StyledLi>
        ))}
      </StyledUl>
    </nav>
  );
}

export default H2GroupMenu;
