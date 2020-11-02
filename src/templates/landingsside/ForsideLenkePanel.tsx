import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
import useUniqueId from '../../utils/useUniqueId';

const StyledSystemtittel = styled(Systemtittel)`
  text-align: center;
  margin: 2rem 0 1rem;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    flex: 15rem 0 0;
    margin: 0.25rem;
  }
`;

export function ForsideLenkePanel(props: { children: ReactNode; title: string; hideTitle?: boolean }) {
  const id = useUniqueId('lenkepanel');

  return (
    <section aria-labelledby={id}>
      <StyledSystemtittel className={props.hideTitle ? 'sr-only' : ''} id={id}>
        {props.title}
      </StyledSystemtittel>
      <StyledUl>{props.children}</StyledUl>
    </section>
  );
}
