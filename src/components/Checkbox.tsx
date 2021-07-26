import React from "react";
import styled from "styled-components";
import useUniqueId from "../utils/useUniqueId";

//Denne komponenten kan byttes ut med nav frontend sin checkbox-input når de får nav-frontend-skjema på navds-react
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Style = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled.input`
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.35em;
`;

function Checkbox(props: Props) {
  const id = useUniqueId("checkbox");
  const { label, className, ...rest } = props;

  return (
    <Style className={className}>
      <StyledInput id={id} type="checkbox" {...rest} />
      <label htmlFor={id}>{label}</label>
    </Style>
  );
}

export default Checkbox;
