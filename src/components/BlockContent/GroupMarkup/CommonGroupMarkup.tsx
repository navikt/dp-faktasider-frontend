import * as React from 'react';
import { ReactNode } from 'react';
import BlockContent from '../BlockContent';
import { createGlobalStyle, StyledComponent } from 'styled-components/macro';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import { useGroupMarkupAriaProps } from './useGroupMarkupAriaProps';
import Anchor from '../../Anchor';
import HashLink from '../../HashLink';

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
  const { regionProps, headerProps, id } = useGroupMarkupAriaProps(group);

  const Region = props.region;
  const Header = props.header;

  return (
    <Region {...regionProps} style={{ position: 'relative' }} {...props.regionProps}>
      <HashLinkHide />
      <Anchor id={id} marginTop={props.anchorMarginTop} focusOnParent={true} />
      <Header {...headerProps} {...props.headerProps} className={linkHideClassName}>
        {group.title}
        <HashLink id={id} ariaLabel={`Lenke til ${group.title}`} />
      </Header>
      {props.beforeContent}
      <BlockContent blocks={group.children} />
    </Region>
  );
}

export default CommonGroupMarkup;
