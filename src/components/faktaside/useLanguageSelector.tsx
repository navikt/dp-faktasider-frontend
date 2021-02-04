import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { useMount } from "react-use";
import { SupportedLanguage, supportedLanguages } from "../../i18n/supportedLanguages";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import { useRouter } from "next/router";
import { isDevelopment } from "../../utils/environment";

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
  const router = useRouter();
  const { push, asPath, query } = router;

  useMount(() => {
    if (isDevelopment()) {
      // Har ikke bra nok språkstøtte enda til at det gir mening å vise denne i prod
      setAvailableLanguages(
        supportedLanguages.map((lang) => ({
          locale: getDekoratørSpråk(lang),
          handleInApp: true,
          url: `https://www.nav.no/arbeid/${lang}/${query.slug}`,
        }))
      );
      onLanguageSelect((event) => push(asPath, undefined, { locale: getSpråkFromDekoratørSpråk(event.locale) }));
    }
  });
}

export default useLanguageSelector;
