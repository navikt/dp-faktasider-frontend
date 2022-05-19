import React, { PropsWithChildren } from "react";
import { useDevContext } from "../../DevKnapper/DevContext";
import styled from "styled-components";

const color = "#80f8";

interface Props {
  situasjoner: string[];
  omvendtFiltrering: boolean;
  as?: "span";
}

const Style = styled.div<{ debugInfo: string }>`
  box-shadow: 0 0 0 0.2rem ${color};
  position: relative;
  &::before {
    content: "${(props) => props.debugInfo}";
    position: absolute;
    right: 0;
    transform: translateY(-100%);
    background-color: ${color};
    color: white;
    font-size: 0.8rem;
    padding: 0.1rem;
    opacity: 0.8;
  }
`;

function VisForDebug(props: PropsWithChildren<Props>) {
  const devContext = useDevContext();
  const debug = devContext.value.highlightFiltrering && props.situasjoner.length;
  const debugInfo = (props.omvendtFiltrering ? "Skjules for " : "Vises for ") + props.situasjoner.join(" & ");

  if (!debug) {
    return <>{props.children}</>;
  }

  return (
    <Style as={props.as} debugInfo={debugInfo}>
      {props.children}
    </Style>
  );
}

export default VisForDebug;
