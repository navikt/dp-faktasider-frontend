import * as React from 'react';
import { ReactNode, useEffect, useReducer, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import ChevronButton from '../../ChevronButton';
import { useTranslation } from 'react-i18next';

const Content = styled.div<{ open: boolean; fullHeight: number }>`
  position: relative;
  transition: 0.3s;
  overflow: hidden;
  max-height: ${(props) => props.fullHeight + 20}px;
  ${(props) =>
    !props.open &&
    css`
      max-height: 3rem;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3rem;
        max-height: 3rem;
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        pointer-events: none;
      }
    `}
`;

const HeightMeasurer = styled.div`
  padding-bottom: 0.5rem;
`;

const StyledChevronButton = styled(ChevronButton)`
  margin-top: 1rem;
`;

function heightReducer(state: number, newHeight: number) {
  return Math.max(newHeight, 50);
}

interface Props {
  children: ReactNode;
  open: boolean;
  toggle: () => void;
}

function VisMerPanel(props: Props) {
  const { t } = useTranslation('global');
  const [maxHeight, setNewMaxHeight] = useReducer(heightReducer, 10000);
  const heightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentRect = heightRef.current?.getBoundingClientRect();
    contentRect && setNewMaxHeight(contentRect.height);
  }, [props.open]);

  return (
    <>
      <Content open={props.open} fullHeight={maxHeight}>
        <HeightMeasurer ref={heightRef}>{props.children}</HeightMeasurer>
      </Content>
      <StyledChevronButton
        aria-hidden={true}
        className="lenke"
        open={props.open}
        title={props.open ? t('visMindre') : t('visMer')}
        onClick={props.toggle}
      />
    </>
  );
}

export default VisMerPanel;
