import React from "react";
import { TidslinjeI } from "../../../utils/richTextUtils/richTextTypes";
import { parseTidslinjedata } from "./parseTidslinjedata";
import Tidspunkt from "./Tidspunkt";
import styled from "styled-components/macro";

interface Props {
  node: TidslinjeI;
}

const StyledOl = styled.ol`
  list-style: none !important;
  padding-left: 0 !important;
`;

function Tidslinje(props: Props) {
  const parsedTidslinjeData = parseTidslinjedata(props.node);

  return (
    <StyledOl>
      {parsedTidslinjeData.map((punkt) => (
        <Tidspunkt key={punkt.id} {...punkt} />
      ))}
    </StyledOl>
  );
}

export default Tidslinje;
