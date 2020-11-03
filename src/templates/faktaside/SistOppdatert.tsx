import styled from "styled-components/macro";
import React from "react";
import { useTranslation } from "react-i18next";
import withErrorBoundary from "../../components/withErrorBoundary";

const Style = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  font-style: italic;
  opacity: 0.8;
`;

interface Props {
  publiseringsTidspunkt: string;
}

function SistOppdatert(props: Props) {
  const { t } = useTranslation("global");
  return <Style>{t("sistOppdatert", { publiseringstidspunkt: new Date(props.publiseringsTidspunkt) })}</Style>;
}

export default withErrorBoundary(SistOppdatert, "SistOppdatert");
