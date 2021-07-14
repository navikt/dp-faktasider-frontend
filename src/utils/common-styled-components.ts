import styled from "styled-components/macro";
import { Element } from "nav-frontend-typografi";
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

export const BulletPointListe = styled.ul`
  padding-left: 2rem;
  list-style: disc;
  margin: 1.5rem 0;
  li {
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  ul {
    list-style: circle;
  }
`;

export const DecimalListe = styled.ol`
  list-style: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
  li {
    margin: 0.5rem 0;
    line-height: 1.3;

    padding-left: 1rem;
  }
`;

export const H4 = styled(Element).attrs({ tag: "h4" })`
  text-align: center;
  margin-bottom: 1rem !important;
`;

export const LenkeUtenUnderstrek = styled(Link).attrs({ className: "navds-link" })`
  text-decoration: none !important;
  &:hover {
    text-decoration: underline !important;
  }
`;
