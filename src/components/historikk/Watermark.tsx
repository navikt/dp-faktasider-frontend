import * as React from "react";
import styled from "styled-components/macro";

const Style = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
  padding: 0.5rem;
  background-color: #f00;
  opacity: 0.6;
  color: white;
  text-align: center;
  width: 20rem;
  transform: rotate(45deg) translate(31%, -195%);
`;

function HistoirkkWatermark() {
  return <Style>Historikk</Style>;
}

export default HistoirkkWatermark;
