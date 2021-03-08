import React from "react";
import { getDataset } from "./utils/getDataset";
import styled from "styled-components";
import { BsExclamationCircle } from "react-icons/bs";

const Style = styled.div`
  &:first-letter {
    text-transform: uppercase;
  }
`;

const Logo = () => {
  const dataset = getDataset();
  switch (dataset) {
    case "production":
      return <ProductionLogo />;
  }

  return <Style>{dataset}</Style>;
};

const ProductionStyle = styled.div`
  background-color: darkolivegreen;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const ProductionLogo = () => {
  return (
    <ProductionStyle>
      <BsExclamationCircle /> <span>Production</span>
    </ProductionStyle>
  );
};

export default Logo;
