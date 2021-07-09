import * as React from "react";
import { ReactNode } from "react";
import { createGlobalStyle, css, StyledComponent } from "styled-components/macro";
import Anchor from "../Anchor";
import HashLink from "../HashLink";
import useUniqueId from "../../utils/useUniqueId";
import { useLoggHarBlittSett } from "../../utils/useLoggHarBlittSett";

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

const sectionHeaderClassName = "section-header-hash-link-on-hover";
const HashLinkShowOnHover = createGlobalStyle`
  .${sectionHeaderClassName} {
    ${showLinkOnHover};
  }
`;

export interface CommonSectionProps {
  children: ReactNode;
  title: string;
  id: string;
  anchorMarginTop?: string;
}

interface Props extends CommonSectionProps {
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
  const headerId = useUniqueId("section-" + props.title);

  const Region = props.region;
  const Header = props.header;

  useLoggHarBlittSett(props.id, props.title);

  return (
    <Region data-testid={props.id} aria-labelledby={headerId} style={{ position: "relative" }} {...props.regionProps}>
      <HashLinkShowOnHover />
      <Anchor id={props.id} spaceAbove={props.anchorMarginTop} focusOnParent={true} />
      <Header id={headerId} {...props.headerProps} className={sectionHeaderClassName}>
        {props.title}
        <HashLink id={props.id} />
      </Header>
      {props.children}
    </Region>
  );
}

export default CommonSectionMarkup;
