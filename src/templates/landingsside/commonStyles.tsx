import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import useUniqueId from '../../utils/useUniqueId';
import { EksternLenkeI } from '../../hooks/graphQl/useProjectData';

const StyledSystemtittel = styled(Systemtittel)`
  text-align: center;
  margin: 2rem 0 0.5rem;
`;

export const StyledListElement = styled.li`
  background-color: white;
  padding: 1.2rem 1.2rem 2rem;
  border-radius: 0.5rem;
  min-height: 8rem;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${StyledListElement} {
    flex: 15rem 0 0;
    margin: 0.5rem;
  }
`;

export const lenkeStyling = css`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-decoration: none;
`;

export const EksternLenkeStyle = styled(Lenke)`
  ${lenkeStyling};
`;

export function ForsideLenkePanel(props: { children: ReactNode; title: string }) {
  const id = useUniqueId('lenkepanel');

  return (
    <section aria-labelledby={id}>
      <StyledSystemtittel id={id}>{props.title}</StyledSystemtittel>
      <StyledUl>{props.children}</StyledUl>
    </section>
  );
}

export function EksternLenke(props: { lenke: EksternLenkeI }) {
  return (
    <StyledListElement key={props.lenke.title}>
      <EksternLenkeStyle href={props.lenke.url}>{props.lenke.title}</EksternLenkeStyle>
      <p>{props.lenke.description}</p>
    </StyledListElement>
  );
}
