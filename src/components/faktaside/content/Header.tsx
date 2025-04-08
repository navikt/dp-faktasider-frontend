import React from "react";
import styled from "styled-components";
import { SistOppdatert } from "./SistOppdatert";
import { useFaktasideContext } from "../FaktaSideContext";
import { Heading } from "@navikt/ds-react";

const Style = styled.div`
  text-align: center;
  margin: 1rem auto 2rem;
  max-width: 38rem;
`;

const StyledSidetittel = styled(Heading).attrs({})`
  margin-bottom: 0.75rem !important;
`;

function Header() {
  const faktaside = useFaktasideContext();
  return (
    <Style>
      <StyledSidetittel level="1" size="xlarge">
        {faktaside.title}
      </StyledSidetittel>
      <SistOppdatert />
    </Style>
  );
}

export default Header;
