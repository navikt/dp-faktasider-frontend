import { onLanguageSelect, setAvailableLanguages, setParams } from "@navikt/nav-dekoratoren-moduler";
import { useMount } from "react-use";
import { SupportedLanguage, supportedLanguages } from "../i18n/supportedLanguages";
import { useRouter } from "next/router";
import { isDevelopment } from "../utils/environment";
import { useEffect } from "react";

function getDekoratørSpråk(lang: SupportedLanguage) {
  switch (lang) {
    case "no":
      return "nb";
    default:
      return lang;
  }
}

function getSpråkFromDekoratørSpråk(lang: string): SupportedLanguage {
  switch (lang) {
    case "en":
      return "en";
    default:
      return "no";
  }
}

function useLanguageSelector() {
  const { push, asPath, basePath, locale } = useRouter();

  useEffect(() => {
    locale && setParams({ language: getDekoratørSpråk(locale as SupportedLanguage) });
  }, [locale]);

  useMount(() => {
    if (isDevelopment()) {
      // Har ikke bra nok språkstøtte enda til at det gir mening å vise denne i prod
      setAvailableLanguages(
        supportedLanguages.map((lang) => {
          return {
            locale: getDekoratørSpråk(lang),
            handleInApp: true,
            url: `https://www.nav.no${basePath}/${lang}${asPath}`,
          };
        })
      );
      onLanguageSelect((event) => push(asPath, undefined, { locale: getSpråkFromDekoratørSpråk(event.locale) }));
    }
  });
}

export default useLanguageSelector;
