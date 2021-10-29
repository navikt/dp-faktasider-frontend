import React from "react";
import { Heading } from "@navikt/ds-react";
import styled from "styled-components/macro";
import CommonSectionMarkup, { CommonSectionProps } from "./CommonSectionMarkup";

const StyledSection = styled.section`
  margin: 1rem -1rem -1rem;
  padding: 1rem; //gjøres for å gi luft til outline når seksjonen har fokus
`;

const StyledTittel = styled(Heading).attrs({ level: "4", size: "small" })`
  margin-bottom: 0.7rem;
`;

function H4Section(props: CommonSectionProps) {
  return <CommonSectionMarkup header={StyledTittel} region={StyledSection} anchorMarginTop="6rem" {...props} />;
}

export default H4Section;
