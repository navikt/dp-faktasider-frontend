import * as React from 'react';
import { ReactNode, useRef } from 'react';
import BlockContent from '../BlockContent';
import { createGlobalStyle, StyledComponent } from 'styled-components/macro';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import Anchor from '../../Anchor';
import HashLink from '../../HashLink';
import { guid } from 'nav-frontend-js-utils';

interface Props {
  header: StyledComponent<any, any>;
  /**
   * Ekstra props som blir sendt til header (<Header {...headerProps} />)
   */
  headerProps?: object;
  region: StyledComponent<any, any>;
  /**
   * Ekstra props som blir sendt til region (<Region {...headerProps} />)
   */
  regionProps?: object;
  beforeContent?: ReactNode;
  group: Group;
  anchorMarginTop?: string;
}

const linkHideClassName = 'group-header-hash-link-hide';
const HashLinkHide = createGlobalStyle`
  .${linkHideClassName} {
    > *:first-child {
      transition: .2s;
      opacity: 0;
    }
    &:hover, &:focus-within, &:focus {
    > *:first-child {
      opacity: 1;
      }
    }
  }
`;

function CommonGroupMarkup(props: Props) {
  const group = props.group;
  const id = group.blockConfig?.id || 'N/A';
  const headerId = useRef(guid()).current;

  const Region = props.region;
  const Header = props.header;

  return (
    <Region data-testid={id} aria-labelledby={headerId} style={{ position: 'relative' }} {...props.regionProps}>
      <HashLinkHide />
      <Anchor id={id} marginTop={props.anchorMarginTop} focusOnParent={true} />
      <Header id={headerId} {...props.headerProps} className={linkHideClassName}>
        {group.title}
        <HashLink id={id} />
      </Header>
      {props.beforeContent}
      <BlockContent blocks={group.children} />
    </Region>
  );
}

export default CommonGroupMarkup;
