import React from "react";
import { createFaktasideContext, FaktasideProvider } from "./FaktaSideContext";
import { useLocale } from "../../i18n/useLocale";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import { MissingLanguage } from "../missing-language/MissingLanguage";
import { Faktaside, FaktasideRawData } from "./Faktaside";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import useLanguageSelector from "../../hooks/useLanguageSelector";
import useLoggUtdatertHashlenke from "../../hooks/useLoggUtdatertHashlenke";

export function FaktasideContainer(props: FaktasideRawData) {
  const locale = useLocale();
  const faktasideContext = createFaktasideContext(props, locale);
  const isPublishedInLanguage = faktasideContext.visSprakversjon?.[locale];
  const title = faktasideContext.title || "";

  useBreadcrumbs(faktasideContext.domainTitle, [
    { tittel: faktasideContext.title || "Du er her", path: faktasideContext.slug },
  ]);
  useLanguageSelector();
  useMount(() => loggSidevisning(title));
  useLoggUtdatertHashlenke();

  if (!isPublishedInLanguage) {
    return <MissingLanguage {...faktasideContext} />;
  }

  return (
    <FaktasideProvider faktasideContext={faktasideContext}>
      <Faktaside />
    </FaktasideProvider>
  );
}
