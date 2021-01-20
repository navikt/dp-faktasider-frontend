import * as React from "react";
import styled from "styled-components/macro";
import { navFrontend } from "../styles/navFrontend";

const Style = styled.div`
  background-color: ${navFrontend.navRod};
  color: white;
  padding: 0.5rem;
  width: 15rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  opacity: 0.5;
  text-align: center;
  transform: translate(-5rem, 1rem) rotate(-45deg);
  font-weight: bold;
`;

function NextBanner() {
  return <Style>Next</Style>;
}

export default NextBanner;
