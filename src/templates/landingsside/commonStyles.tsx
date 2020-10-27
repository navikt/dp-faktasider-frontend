import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import useUniqueId from '../../utils/useUniqueId';
import { EksternLenkeI } from '../../hooks/graphQl/useProjectData';

const StyledSystemtittel = styled(Systemtittel)`
  text-align: center;
  margin: 2rem 0 1rem;
`;

export const StyledListElement = styled.li`
  padding: 1rem;
  border-radius: 0.5rem;
  min-height: 8rem;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${StyledListElement} {
    flex: 15rem 0 0;
    margin: 0.25rem;
  }
`;

export const lenkeStyling = css`
  display: block;
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const EksternLenkeStyle = styled(Lenke)`
  ${lenkeStyling};
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

export function EksternLenke(props: { lenke: EksternLenkeI }) {
  return (
    <StyledListElement key={props.lenke.tittel}>
      <EksternLenkeStyle href={props.lenke.url}>{props.lenke.tittel}</EksternLenkeStyle>
      <p>{props.lenke.beskrivelse}</p>
    </StyledListElement>
  );
}
