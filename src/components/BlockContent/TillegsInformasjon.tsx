import * as React from 'react';
import { useEffect, useReducer } from 'react';
import styled, { css } from 'styled-components';
import BlockContent from './BlockContent';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../utils/richTextUtils/parser/parseRichText';
import withErrorBoundary from '../withErrorBoundary';
import ChevronButton from '../ChevronButton';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { loggVisTilleggsinfo } from '../../utils/logging';
import useUniqueId from '../../utils/useUniqueId';

interface Props {
  node: {
    innhold: SanityBlock[];
    title: string;
  };
}

const asideBorder = 'solid 1px #bbb8';

const StyledAside = styled.aside`
  border-top: ${asideBorder};
  border-bottom: ${asideBorder};
  padding: 1.5rem 0.5rem;
  margin: 1.5rem 0;
`;

const Content = styled.div<{ open: boolean }>`
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
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
        background: linear-gradient(transparent, white);
      }
    `}
`;

const Label = styled(Undertekst)`
  opacity: 0.5;
  font-size: 0.7rem;
  margin: 0 !important;
  text-transform: uppercase;
`;

const StyledElement = styled(Element)`
  margin-top: 0;
`;

function Tilleggsinnformasjon(props: Props) {
  const parsedText = parseRichText(props.node.innhold);
  const [open, toggle] = useReducer((state) => !state, false);
  const id = useUniqueId('tilleggsinfo-' + props.node.title);
  const { t } = useTranslation('global');

  useEffect(() => {
    open && loggVisTilleggsinfo(props.node.title);
  }, [open, props.node.title]);

  return (
    <StyledAside aria-labelledby={id}>
      <Label>{t('tilleggsinformasjon')}</Label>
      <StyledElement tag="h4" id={id}>
        {props.node.title}
      </StyledElement>
      <Content open={open}>
        <BlockContent blocks={parsedText} />
      </Content>
      <ChevronButton
        aria-hidden={true}
        className="lenke"
        open={open}
        title={open ? t('visMindre') : t('visMer')}
        onClick={toggle}
      />
    </StyledAside>
  );
}

export default withErrorBoundary(Tilleggsinnformasjon, 'Tilleggsinnformasjon');
