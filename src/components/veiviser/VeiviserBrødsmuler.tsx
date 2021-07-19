import * as React from "react";
import styled from "styled-components/macro";
import { VeiviserContext } from "./VeiviserStateChart";
import Chevron from "../faktaside/Meny/Chevron";

const Style = styled.div`
  margin-left: 5rem;
`;

const BrødsmuleStyle = styled.button`
  background-color: transparent;
  border: none;
  &:not(:last-child) {
    > * {
      margin-right: 1rem;
    }
  }
  &:last-child {
    > *:nth-child(2) {
      display: none;
    }
  }
`;

function Brødsmule(props: { label: string; onClick: () => void }) {
  return (
    <BrødsmuleStyle className="lenke" onClick={props.onClick}>
      <span>{props.label}</span>
      <Chevron retning="høyre" />
    </BrødsmuleStyle>
  );
}

function VeiviserBrødsmuler(props: {
  context: VeiviserContext;
  send: (state: "TILBAKETILVELGSIDE" | "TILBAKETILVELGFILTRERING" | "TILBAKETILVELGOVERSKRIFT") => void;
}) {
  const { side, filtrering, group } = props.context;
  return (
    <Style>
      <Brødsmule label={"App"} onClick={() => props.send("TILBAKETILVELGSIDE")} />
      {side && <Brødsmule label={side.title || "N/A"} onClick={() => props.send("TILBAKETILVELGFILTRERING")} />}
      {filtrering && <Brødsmule label={filtrering || "N/A"} onClick={() => props.send("TILBAKETILVELGOVERSKRIFT")} />}
      {group && <Brødsmule label={group.title || "N/A"} onClick={() => null} />}
    </Style>
  );
}

export default VeiviserBrødsmuler;
