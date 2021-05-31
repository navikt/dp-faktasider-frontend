import * as React from "react";
import { useReducer, useRef } from "react";
import styled, { css } from "styled-components/macro";
import { isDevelopment } from "../../utils/environment";
import { useClickAway } from "react-use";
import { useDevContext } from "./DevContext";
import { Checkbox } from "nav-frontend-skjema";
import withErrorBoundary from "../withErrorBoundary";
import { useQueryParams } from "../../utils/useQueryParams";
import Link from "next/link";

const Style = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: 4rem;
  top: 1rem;
  ${(props) =>
    props.isOpen &&
    css`
      background-color: #555;
      box-shadow: 0 0 0 0.2rem yellow;
      border-radius: 0.5rem;
    `};
  z-index: 1500;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
`;

const Button = styled.button`
  border-radius: 50%;
  box-shadow: 0 0 0 0.2rem yellow;
  background-color: #555;
  color: white;
  font-weight: bold;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  opacity: 0.9;
`;

const Innhold = styled.div`
  padding: 1rem;

  > * {
    margin-bottom: 0.5rem;
  }
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: underline;
  display: block;
`;

function reducer(state: boolean, action: "toggle" | "close") {
  switch (action) {
    case "toggle":
      return !state;
    case "close":
      return false;
    default:
      return state;
  }
}

function DevKnapper() {
  const [open, dispatch] = useReducer(reducer, false);
  const ref = useRef<HTMLDivElement>(null);
  const context = useDevContext();
  const params = useQueryParams<{ hemmelig: boolean }>();

  useClickAway(ref, () => dispatch("close"));

  const vis = isDevelopment() || params.hemmelig;
  if (!vis) {
    return null;
  }

  return (
    <Style isOpen={open} ref={ref}>
      <Button onClick={() => dispatch("toggle")}>dev</Button>
      {open && (
        <Innhold>
          <Checkbox onClick={() => context.toggle("utkast")} label="Vis utkast" checked={context.value.visUtkast} />
          <Checkbox
            onClick={() => context.toggle("filtrering")}
            label="Highlight filtrering"
            checked={context.value.highlightFiltrering}
          />
          <Checkbox
            onClick={() => context.toggle("delteTekster")}
            label="Debug delte tekster"
            checked={context.value.debugDelteTekster}
          />
          <Checkbox
            onClick={() => context.toggle("grunnbellop")}
            label="Debug grunnbelløp"
            checked={context.value.debugGronnbellop}
          />
          <Link href="/testdata" passHref>
            <StyledLink>Test-data</StyledLink>
          </Link>
          <Link href="/historikk/testdata" passHref>
            <StyledLink>Historikk test-data</StyledLink>
          </Link>
        </Innhold>
      )}
    </Style>
  );
}

export default withErrorBoundary(DevKnapper, "DevKnapper");
