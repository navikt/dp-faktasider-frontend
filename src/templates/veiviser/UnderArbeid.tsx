import * as React from "react";
import styled from "styled-components/macro";

const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  padding: 1rem;
  background-color: #f00;
  opacity: 0.6;
  color: white;
  text-align: center;
  width: 30rem;
  transform: rotate(-45deg) translate(-30%, -84%);
`;

function UnderArbeid() {
  return <Style>Denne løsningen er under utvikling</Style>;
}

export default UnderArbeid;
