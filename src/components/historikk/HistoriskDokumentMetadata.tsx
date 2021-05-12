import { Undertittel } from "nav-frontend-typografi";
import { formaterDato } from "../../utils/formaterDato";
import styled from "styled-components";
import React from "react";
import { HistoriskDokument } from "./api/historikkFetcher";

const MetadataStyle = styled.section`
  padding: 1rem 1.5rem;
  background-color: hsl(0deg 0% 95%);
  border-radius: 0.5rem;
  font-size: 0.9rem;
`;

const Bold = styled.span`
  font-weight: 600;
`;

function HistoriskDokumentMetadata(props: { dokument: HistoriskDokument }) {
  return (
    <MetadataStyle>
      <Undertittel>Dokument-metadata</Undertittel>
      <p>
        ID: <Bold>{props.dokument._id}</Bold>
      </p>
      <p>
        Type: <Bold>{props.dokument._type}</Bold>
      </p>
      <p>
        Tittel: <Bold>{props.dokument.title}</Bold>
      </p>
      <p>
        Publisert: <Bold>{formaterDato(props.dokument._updatedAt)}</Bold>
      </p>
    </MetadataStyle>
  );
}

export default HistoriskDokumentMetadata;
