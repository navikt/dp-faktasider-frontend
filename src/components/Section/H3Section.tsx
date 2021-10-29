import React from "react";
import styled from "styled-components/macro";
import { Heading } from "@navikt/ds-react";
import CommonSectionMarkup, { CommonSectionProps } from "./CommonSectionMarkup";

const StyledSection = styled.section`
  margin: 1.5rem -1rem -1rem;
  padding: 1rem; //gjøres for å gi luft til outline når seksjonen har fokus
`;

const StyledTittel = styled(Heading).attrs({ level: "3", size: "large" })`
  margin-bottom: 1rem;
`;

function H3Section(props: CommonSectionProps) {
  return <CommonSectionMarkup header={StyledTittel} region={StyledSection} anchorMarginTop="7rem" {...props} />;
}

export default H3Section;
