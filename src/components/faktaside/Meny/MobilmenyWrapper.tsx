import * as React from "react";
import { ReactNode, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";
import MenyButton from "./MenyButton";
import { useClickAway, useLocation } from "react-use";
import { theme } from "../../../styles/theme";
import { loggMeny } from "../../../utils/logging";

interface Props {
  children: ReactNode;
}

const SmallScreenLayout = styled.div<{ apen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  @supports (position: sticky) {
    position: sticky;
    top: 0;
  }
  transition: top 0.2s;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  border-radius: 0.5rem;
  filter: drop-shadow(0 0.5rem 0.5rem #0005);
  ${(props) =>
    props.apen &&
    css`
      border: 1px #aaa8 solid;
      background-color: white;
    `};
  pointer-events: auto;
`;

const StickyContainer = styled.div`
  @media not all and (${theme.media.smallScreen}) {
    display: none;
  }
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  pointer-events: none;
`;

const MenyWrapper = styled.div<{ visMeny: boolean }>`
  transition: max-height 0.2s;
  max-height: calc(100vh);
  max-width: 25rem;
  overflow-y: auto;

  border-radius: 0.5rem;
  ${(props) =>
    !props.visMeny &&
    css`
      display: none;
    `}
`;

const StyledMenyButton = styled(MenyButton)`
  margin: 1rem;
  background-color: white;
  position: absolute;
  right: 0;
  top: 0;
  box-shadow: 0 0 0 0.2rem #8886;
  z-index: 10;
`;

function MobilmenyWrapper(props: Props) {
  const location = useLocation();
  const [visMeny, setVisMeny] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setVisMeny(false));

  useEffect(() => {
    visMeny && loggMeny("Åpne mobilmeny");
  }, [visMeny]);

  useEffect(() => {
    setVisMeny(false);
  }, [location.hash]);

  return (
    <StickyContainer>
      <SmallScreenLayout apen={visMeny} ref={ref}>
        <StyledMenyButton label="Sideoversikt" onClick={() => setVisMeny((prevState) => !prevState)} isOpen={visMeny} />
        <MenyWrapper visMeny={visMeny}>{props.children}</MenyWrapper>
      </SmallScreenLayout>
    </StickyContainer>
  );
}

export default MobilmenyWrapper;
