import * as React from 'react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import MenyButton from './MenyButton';
import { useClickAway, useLocation } from 'react-use';
import { theme } from '../../../styles/theme';

interface Props {
  children: ReactNode;
  offsetTop: number;
}

const margin = '1rem';

const SmallScreenLayout = styled.div<{ apen: boolean; offsetTop: number }>`
  position: absolute;
  top: 0;
  right: 0;
  @supports (position: sticky) {
    position: sticky;
    top: calc(${margin} + ${(props) => props.offsetTop}px);
  }
  margin: ${margin};
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

const MenyWrapper = styled.div<{ visMeny: boolean; offsetTop: number }>`
  transition: max-height 0.2s;
  max-height: calc(100vh - ${margin} * 2 - ${(props) => props.offsetTop}px);
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
  background-color: white;
  position: absolute;
  right: 0;
  top: 0;
  box-shadow: 0 0 0 0.2rem #8886;
`;

function MobilmenyWrapper(props: Props) {
  const location = useLocation();
  const [visMeny, setVisMeny] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setVisMeny(false));

  useEffect(() => {
    setVisMeny(false);
  }, [location.hash]);

  return (
    <StickyContainer>
      <SmallScreenLayout apen={visMeny} ref={ref} offsetTop={props.offsetTop}>
        <StyledMenyButton
          label="Innholdsfortegnelse"
          onClick={() => setVisMeny((prevState) => !prevState)}
          isOpen={visMeny}
        />
        <MenyWrapper visMeny={visMeny} offsetTop={props.offsetTop}>
          {props.children}
        </MenyWrapper>
      </SmallScreenLayout>
    </StickyContainer>
  );
}

export default MobilmenyWrapper;
