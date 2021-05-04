import * as React from "react";
import { ReactNode } from "react";
import { createGlobalStyle, css, StyledComponent } from "styled-components/macro";
import Anchor from "../../Anchor";
import HashLink from "../../HashLink";
import useUniqueId from "../../../utils/useUniqueId";

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

export interface CommonGroupProps {
  children: ReactNode;
  title: string;
  id: string;
  anchorMarginTop?: string;
}

interface Props extends CommonGroupProps {
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
}

function CommonSectionMarkup(props: Props) {
  const headerId = useUniqueId("group-" + props.title);

  const Region = props.region;
  const Header = props.header;

  return (
    <Region data-testid={props.id} aria-labelledby={headerId} style={{ position: "relative" }} {...props.regionProps}>
      <HashLinkShowOnHover />
      <Anchor id={props.id} spaceAbove={props.anchorMarginTop} focusOnParent={true} />
      <Header id={headerId} {...props.headerProps} className={groupHeaderClassName}>
        {props.title}
        <HashLink id={props.id} />
      </Header>
      {props.children}
    </Region>
  );
}

export default CommonSectionMarkup;
