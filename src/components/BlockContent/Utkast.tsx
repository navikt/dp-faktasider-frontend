import * as React from 'react';
import styled from 'styled-components/macro';
import { isProduction } from '../../utils/environment';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../utils/richTextUtils/parseRichText';
import BlockContent from './BlockContent';
import { ReactNode } from 'react';

interface Props {
  node: {
    innhold: SanityBlock[];
  };
}

const Style = styled.div`
  position: relative;
  box-shadow: 0 0 0 0.2rem #ff0a;
  background-color: #ff02;
`;

const Label = styled.div`
  position: absolute;
  right: -2rem;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  opacity: 0.6;
`;

function Utkast(props: Props) {
  if (isProduction()) {
    return null;
  }

  const parsedText = parseRichText(props.node.innhold);

  return (
    <Style title="Dette vises ikke i prod">
      <Label>Utkast</Label>
      <BlockContent blocks={parsedText} />
    </Style>
  );
}

export function UtkastInline(props: { children: ReactNode }) {
  if (isProduction()) {
    return null;
  }

  return (
    <Style as="span" title="Dette vises ikke i prod">
      {props.children}
    </Style>
  );
}

export default Utkast;
