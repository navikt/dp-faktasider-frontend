import * as React from 'react';
import styled from 'styled-components/macro';
import useSmoothscrollOnClick from '../../../hooks/useSmoothscrollOnClick';
import { LenkeUtenUnderstrek } from '../../../utils/common-styled-components';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import { loggH2MenyKlikk } from '../../../utils/logging';

interface Props {
  underGrupper: Group[];
  title: string;
}

const StyledLi = styled.li`
  margin: 0.6rem 0 !important;
`;

const StyledUl = styled.ul`
  list-style: disc;
  margin-left: 1rem;
`;

function H2GroupMenu(props: Props) {
  const { SmoothScroll, activateSmoothScroll } = useSmoothscrollOnClick();
  const id = useRef(guid()).current;

  const handleOnClick = () => {
    activateSmoothScroll();
    loggH2MenyKlikk();
  };

  return (
    <nav className="typo-normal" aria-labelledby={id}>
      <h3 className="sr-only" id={id}>
        Innhold {props.title}
      </h3>
      <SmoothScroll />
      <StyledUl>
        {props.underGrupper.map((underGruppe) => (
          <StyledLi key={underGruppe.blockConfig?.id}>
            <LenkeUtenUnderstrek onClick={handleOnClick} href={'#' + underGruppe.blockConfig?.id}>
              {underGruppe.title}
            </LenkeUtenUnderstrek>
          </StyledLi>
        ))}
      </StyledUl>
    </nav>
  );
}

export default H2GroupMenu;
