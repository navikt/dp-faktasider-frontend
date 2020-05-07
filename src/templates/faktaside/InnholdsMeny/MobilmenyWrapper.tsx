import * as React from 'react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import HamburgerButton from './HamburgerButton';
import { useClickAway, useLocation } from 'react-use';
import { theme } from '../../../styles/theme';

interface Props {
  children: ReactNode;
}

const SmallScreenLayout = styled.div<{ apen: boolean }>`
  position: sticky;
  margin: 1rem;
  top: 1rem;
  z-index: 1000;
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

const MenyWrapper = styled.div<{ visMeny: boolean }>`
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  ${(props) =>
    !props.visMeny &&
    css`
      display: none;
    `}
`;

const StyledHamburgerButton = styled(HamburgerButton)`
  background-color: white;
  position: absolute;
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
      <SmallScreenLayout apen={visMeny} ref={ref}>
        <StyledHamburgerButton
          label="Innholdsfortegnelse"
          onClick={() => setVisMeny((prevState) => !prevState)}
          isOpen={visMeny}
        />
        <MenyWrapper visMeny={visMeny}>{props.children}</MenyWrapper>
      </SmallScreenLayout>
    </StickyContainer>
  );
}

export default MobilmenyWrapper;
