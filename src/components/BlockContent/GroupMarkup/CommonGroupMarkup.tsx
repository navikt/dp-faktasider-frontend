import * as React from "react";
import { ReactNode } from "react";
import BlockContent from "../BlockContent";
import { createGlobalStyle, css, StyledComponent } from "styled-components/macro";
import { Group } from "../../../utils/richTextUtils/richTextTypes";
import Anchor from "../../Anchor";
import HashLink from "../../HashLink";
import useUniqueId from "../../../utils/useUniqueId";

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

export const showLinkOnHover = css`
  a {
    transition: 0.2s;
    opacity: 0;
  }
  &:hover,
  &:focus-within,
  &:focus {
    a {
      opacity: 1;
    }
  }
`;

const groupHeaderClassName = "group-header-hash-link-on-hover";
const HashLinkShowOnHover = createGlobalStyle`
  .${groupHeaderClassName} {
    ${showLinkOnHover};
  }
`;

function CommonGroupMarkup(props: Props) {
  const group = props.group;
  const id = group.blockConfig?.id || "N/A";
  const headerId = useUniqueId("group-" + props.group.title);

  const Region = props.region;
  const Header = props.header;

  return (
    <Region data-testid={id} aria-labelledby={headerId} style={{ position: "relative" }} {...props.regionProps}>
      <HashLinkShowOnHover />
      <Anchor id={id} spaceAbove={props.anchorMarginTop} focusOnParent={true} />
      <Header id={headerId} {...props.headerProps} className={groupHeaderClassName}>
        {group.title}
        <HashLink id={id} />
      </Header>
      {props.beforeContent}
      <BlockContent blocks={group.children} />
    </Region>
  );
}

export default CommonGroupMarkup;
