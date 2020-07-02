import * as React from 'react';
import { ReactNode } from 'react';
import BlockContent from '../BlockContent';
import { StyledComponent } from 'styled-components';
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

function CommonGroupMarkup(props: Props) {
  const group = props.group;
  const { regionProps, headerProps, id } = useGroupMarkupAriaProps(group);

  const Region = props.region;
  const Header = props.header;

  return (
    <Region {...regionProps} style={{ position: 'relative' }} {...props.regionProps}>
      <Anchor id={id} marginTop={props.anchorMarginTop} focusOnParent={true} />
      <Header {...headerProps} {...props.headerProps}>
        <HashLink id={id} ariaLabel={`Lenke til ${group.title}`} />
        {group.title}
      </Header>
      {props.beforeContent}
      <BlockContent blocks={group.children} />
    </Region>
  );
}

export default CommonGroupMarkup;
