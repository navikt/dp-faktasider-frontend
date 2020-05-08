import * as React from 'react';
import { KnappLenke } from '../../utils/common-styled-components';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';

interface Props {
  children: string[];
  mark: {
    href: string;
    knapp?: boolean;
    blank?: boolean;
  };
}

const Center = styled.div`
  text-align: center;
`;

function LinkMarkup(props: Props) {
  const nyttVindu = props.mark.blank
    ? {
        target: '_blank',
        rel: 'noopener',
      }
    : {};

  if (props.mark.knapp) {
    return (
      <Center>
        <KnappLenke href={props.mark.href} {...nyttVindu}>
          {props.children}
        </KnappLenke>
      </Center>
    );
  }

  return (
    <Lenke href={props.mark.href} {...nyttVindu}>
      {props.children}
    </Lenke>
  );
}

export default LinkMarkup;
