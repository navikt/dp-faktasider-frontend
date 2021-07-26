import React from "react";
import styled from "styled-components";
import useUniqueId from "../utils/useUniqueId";
import { theme } from "../styles/theme";

//Denne komponenten kan byttes ut med nav frontend sin input når de får nav-frontend-skjema på navds-react
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.2rem;
  border: 1px solid ${theme.colors.navGra60};
`;

function Input(props: Props) {
  const id = useUniqueId("textinput");
  const { label, className, ...rest } = props;

  return (
    <Style className={className}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput id={id} {...rest} />
    </Style>
  );
}

export default Input;
