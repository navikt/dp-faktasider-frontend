import styled from "styled-components/macro";
import { Input } from "nav-frontend-skjema";
import { Element } from "nav-frontend-typografi";

export const KalkulatorStyle = styled.aside`
  margin: 3rem 0;
  .ReactCollapse--collapse {
    transition: height 0.3s;
  }
  .ReactCollapse--content {
    text-align: center;
  }
`;

export const KalkulatorHeader = styled(Element).attrs({ tag: "h1" })`
  text-align: center;
  margin-bottom: 1rem !important;
`;

export const ResultatTable = styled.table`
  margin: 0.5rem auto 1rem;
  text-align: right;
  td {
    padding: 0.2rem 0.5rem;
    vertical-align: middle;
  }
  tr:nth-last-child(3) ~ tr {
    font-weight: 600;
  }
  tr:nth-last-child(2) {
    td {
      padding-top: 0.6rem;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  label {
    font-weight: normal;
  }
`;

export const GrunnlagInput = styled(Input)`
  input {
    width: 5.5rem;
  }
`;

export function toKR(kr: number) {
  return Math.round(kr).toLocaleString("nb-NO") + " kr";
}
