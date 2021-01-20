import * as React from "react";
import styled from "styled-components/macro";
import { Element } from "nav-frontend-typografi";
import { Group } from "../../../utils/richTextUtils/richTextTypes";
import CommonGroupMarkup from "./CommonGroupMarkup";

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledTittel = styled(Element).attrs({ as: "h4", className: "typo-element" })`
  margin: 3rem 0 0.7rem !important;
`;

function H4GroupMarkup(props: Group) {
  return <CommonGroupMarkup header={StyledTittel} region={StyledSection} group={props} anchorMarginTop="6rem" />;
}

export default H4GroupMarkup;
