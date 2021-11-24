import styled from "styled-components/macro";
import { Link } from "@navikt/ds-react";

export const LenkeKnapp = styled.button.attrs({ className: "navds-link" })`
  border: none;
  padding: 0;
  border-radius: 0.2rem;
  cursor: pointer;
  background-color: transparent;
  text-align: left;
`;

export const KnappLenke = styled.a.attrs({ className: "navds-button navds-button--primary navds-body-short" })`
  text-transform: none;
  white-space: normal !important;
  text-align: center;
  margin: 0.7rem 0;
`;

export const LenkeUtenUnderstrek = styled(Link).attrs({ className: "navds-link" })`
  text-decoration: none !important;
  &:hover {
    text-decoration: underline !important;
  }
`;
