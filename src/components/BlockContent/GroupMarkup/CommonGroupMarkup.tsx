import * as React from 'react';
import BlockContent from '../BlockContent';
import { StyledComponent } from 'styled-components';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import { useGroupMarkupAriaProps } from './useGroupMarkupAriaProps';
import Anchor from '../../Anchor';
import HashLink from '../../HashLink';
import { ReactNode } from 'react';

interface Props {
  header: StyledComponent<any, any>;
  region: StyledComponent<any, any>;
  beforeContent?: ReactNode;
  group: Group;
  anchorMarginTop?: string;
}

function CommonGroupMarkup(props: Props) {
  const group = props.group;
  const { regionProps, headerProps, id } = useGroupMarkupAriaProps(group);

  const Region = props.region;
  const Header = props.header;

  return (
    <Region {...regionProps} style={{ position: 'relative' }}>
      <Anchor id={id} marginTop={props.anchorMarginTop} focusOnParent={true} />
      <Header {...headerProps}>
        <HashLink id={id} ariaLabel={`Lenke til ${group.title}`} />
        {group.title} 🧅
      </Header>
      {props.beforeContent}
      <BlockContent blocks={group.children} />
    </Region>
  );
}

export default CommonGroupMarkup;
