import React, { useRef } from "react";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import { SanityContent } from "../../sanity-content/SanityContent";
import { TidslinjePunkt } from "./parseTidslinjedata";
import { guid } from "nav-frontend-js-utils";

const circleSize = "1.3rem";

const borderstyle = `0.21rem ${theme.colors.navBlaLighten60} solid`;

const StyledLi = styled.li`
  padding-left: 2.5rem !important;
  position: relative;
  overflow: auto;
  margin: 0 !important;
  &::before {
    content: "";
    position: absolute;
    height: ${circleSize};
    width: ${circleSize};
    left: 0;
    border: ${borderstyle};
    border-radius: 50%;
  }
  &::after {
    content: "";
    position: absolute;
    height: calc(100% - ${circleSize});
    left: calc(${circleSize} / 2.3);
    top: ${circleSize};
    border-left: ${borderstyle};
  }
`;

const StyledElement = styled.div.attrs({ className: "navds-label" })`
  display: flex;
  align-items: center;
  min-height: ${circleSize};
  margin: 0 0 1rem !important;
  p {
    margin: 0 !important;
  }
`;

function Tidspunkt(props: TidslinjePunkt) {
  const id = useRef(guid()).current;

  return (
    <StyledLi aria-labelledby={id}>
      <StyledElement id={id}>{props.tittel && <SanityContent blocks={[props.tittel]} />}</StyledElement>
      <SanityContent blocks={props.innhold} />
    </StyledLi>
  );
}

export default Tidspunkt;
