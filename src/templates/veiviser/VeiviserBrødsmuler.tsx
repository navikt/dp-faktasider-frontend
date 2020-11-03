import * as React from "react";
import styled from "styled-components/macro";
import { VeiviserContext } from "./VeiviserStateChart";
import NavFrontendChevron from "nav-frontend-chevron";
import { getFiltreringsvalgLabel } from "../faktaside/TilpassInnhold/getFiltreringsLabel";

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
      <NavFrontendChevron type="høyre" />
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
      {filtrering && (
        <Brødsmule
          label={filtrering ? getFiltreringsvalgLabel(filtrering) : "N/A"}
          onClick={() => props.send("TILBAKETILVELGOVERSKRIFT")}
        />
      )}
      {group && <Brødsmule label={group.title || "N/A"} onClick={() => null} />}
    </Style>
  );
}

export default VeiviserBrødsmuler;
