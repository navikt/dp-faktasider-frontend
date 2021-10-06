import React, { ReactNode } from "react";
import { useDevContext } from "../../DevKnapper/DevContext";
import styled from "styled-components/macro";

interface Props {
  children: ReactNode;
  ikkeVisPåDenneSiden: boolean;
}

const color = "#f008";

const DebugStyle = styled.div<{ debugInfo: string }>`
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

function useVisPaaSideDebug(props: Props) {
  const devContext = useDevContext();

  return {
    debug: devContext.value.debugDelteTekster,
    component: props.ikkeVisPåDenneSiden ? (
      <DebugStyle debugInfo={"Delt tekst som ikke vises på denne siden"}>{props.children}</DebugStyle>
    ) : (
      <>{props.children}</>
    ),
  };
}

export default useVisPaaSideDebug;
