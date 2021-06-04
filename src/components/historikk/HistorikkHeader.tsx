import { Sidetittel } from "nav-frontend-typografi";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";
import { formaterDato } from "../../utils/formaterDato";
import Revisions from "../faktaside/content/Revisions";
import { HistoriskDokument } from "./api/historikkFetcher";
import { useHistorikkContext } from "./HistorikkContext";
import { Revision } from "./api/revisionsFetcher";
import { colors } from "../../styles/theme";
import { useRouter } from "next/router";

const Style = styled.div`
  width: var(--content-max-width);
  max-width: 100vw;
  margin: auto;

  > * {
    margin-bottom: 0.5rem;
  }
`;

const Metadata = styled.div`
  margin-top: 2rem;
  display: inline-grid;
  grid-template-areas:
    "tittel type"
    "id id";
  grid-gap: 0 1rem;
`;

const DokumentTittelStyle = styled.h2`
  font-size: 1.5rem;
`;

const etikettStyle = (color: string) => css`
  padding: 0.15rem 0.5rem;
  background-color: ${color};
  color: white;
  border-radius: 0.3rem;
`;

const TypeStyle = styled.div`
  ${etikettStyle(colors.navGronnDarken60)}
`;

const IdStyle = styled.div`
  opacity: 0.7;
`;

const StyledTime = styled.time`
  font-weight: bold;
  ${etikettStyle(colors.navBlaDarken60)}
`;

const StyledButton = styled.button.attrs({ className: "lenke" })`
  background-color: transparent;
  border: none;
  margin-left: 0.5rem;
`;

const DatovelgerStyle = styled.div`
  margin-top: 1rem;
  > * {
    margin-bottom: 0.5rem;
  }
`;

function HistorikkHeader(props: { document?: HistoriskDokument; revisions: Revision[]; title: string }) {
  const context = useHistorikkContext();
  const [openRevisions, setOpenRevisions] = useState(false);

  const path = useRouter().asPath;
  useEffect(() => {
    setOpenRevisions(false);
  }, [path]);

  return (
    <Style>
      <Sidetittel>{context.hjelpeTekster?.title}</Sidetittel>
      <Metadata>
        <DokumentTittelStyle style={{ gridArea: "tittel" }}>{props.title}</DokumentTittelStyle>
        <TypeStyle style={{ gridArea: "type" }}>{props.document?._type}</TypeStyle>
        <IdStyle style={{ gridArea: "id" }}>Id: {props.document?._id}</IdStyle>
      </Metadata>
      <DatovelgerStyle>
        <div>
          Valgt dato: {props.document && <StyledTime>{formaterDato(props.document._updatedAt)}</StyledTime>}
          <StyledButton className="lenke" onClick={() => setOpenRevisions(!openRevisions)}>
            Endre
          </StyledButton>
        </div>
        {props.document && openRevisions && (
          <Revisions
            revisions={props.revisions}
            documentId={props.document._id}
            currentRevision={props.document?._rev}
          />
        )}
      </DatovelgerStyle>
    </Style>
  );
}

export default HistorikkHeader;
