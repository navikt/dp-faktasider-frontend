import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { Undertittel } from "nav-frontend-typografi";
import useUniqueId from "../../utils/useUniqueId";
import { contentMaxwidth } from "./style";

const StyledUndertittel = styled(Undertittel)`
  margin-bottom: 2rem;
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
    grid-gap: 1.5rem;
  }
`;

const StyledSection = styled.section`
  width: ${contentMaxwidth};
  max-width: 100vw;
`;

export function ForsideLenkePanel(props: {
  children: ReactNode;
  title: string;
  hideTitle?: boolean;
  className?: string;
}) {
  const id = useUniqueId("lenkepanel");

  return (
    <StyledSection aria-labelledby={id} className={props.className}>
      <StyledUndertittel className={props.hideTitle ? "sr-only" : ""} id={id}>
        {props.title}
      </StyledUndertittel>
      <StyledUl>{props.children}</StyledUl>
    </StyledSection>
  );
}
