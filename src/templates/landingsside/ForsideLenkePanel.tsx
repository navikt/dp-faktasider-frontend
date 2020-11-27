import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { Systemtittel } from "nav-frontend-typografi";
import useUniqueId from "../../utils/useUniqueId";

const StyledSystemtittel = styled(Systemtittel)`
  margin: 2rem 0;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    flex: 15rem 0 0;
  }
  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    grid-gap: 2.5rem;
  }
`;

const StyledSection = styled.section`
  margin: 4rem 0 1rem;
`;

export function ForsideLenkePanel(props: { children: ReactNode; title: string; hideTitle?: boolean }) {
  const id = useUniqueId("lenkepanel");

  return (
    <StyledSection aria-labelledby={id}>
      <StyledSystemtittel className={props.hideTitle ? "sr-only" : ""} id={id}>
        {props.title}
      </StyledSystemtittel>
      <StyledUl>{props.children}</StyledUl>
    </StyledSection>
  );
}
