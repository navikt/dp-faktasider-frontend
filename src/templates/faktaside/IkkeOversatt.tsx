import * as React from "react";
import { FaktaSideProps } from "../../pages/[slug]";
import styled from "styled-components/macro";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../i18n/supportedLanguages";
import FaktaSideLayout from "./FaktaSideLayout";
import withErrorBoundary from "../../components/withErrorBoundary";
import { useMount } from "react-use";
import { loggIkkeOversatt } from "../../utils/logging";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 30vh;
`;

const StyledUl = styled.ul`
  list-style: none !important;
`;

const StyledNormaltekst = styled(Normaltekst)`
  margin: 2rem 0 0 !important;
`;

function IkkeOversatt(props: FaktaSideProps) {
  // @ts-ignore
  const page = props.pageContext;
  const { t } = useTranslation("global");
  const title = page.title || "";
  const beskrivelse = page.beskrivelse || "";

  useMount(() => loggIkkeOversatt(title));

  const oversettelser = supportedLanguages.map((lang) => {
    const publisert = page.visSprakversjon?.[lang];
    if (!publisert) {
      return null;
    }
    const tittel = page.rawData.title?.[lang];
    return (
      <li>
        {/* @ts-ignore*/}
        <Link to={`/${lang}/${page.slug}`}>{tittel} - ({t(lang)})</Link>
      </li>
    );
  });

  return (
    <FaktaSideLayout header={title} beskrivelse={beskrivelse}>
      <Style>
        <Innholdstittel>{t("ikkeOversatt")}</Innholdstittel>
        {oversettelser.length && (
          <>
            <StyledNormaltekst>{t("tilgjengeligPåAndreSpråk")}</StyledNormaltekst>
            <StyledUl>{oversettelser}</StyledUl>
          </>
        )}
      </Style>
    </FaktaSideLayout>
  );
}

export default withErrorBoundary(IkkeOversatt, "IkkeOversatt");
