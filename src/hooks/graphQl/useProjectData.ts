import { graphql, useStaticQuery } from "gatsby";
import { useLocale } from "../../i18n/LocaleContext";
import localizeSanityContent from "../../i18n/localizeSanityContent";

export interface EksternLenkeI {
  tittel: string;
  beskrivelse: string;
  url: string;
}

export interface ProjectData {
  title: string;
  folketrygdensGrunnbellop: number;
  komIgangLenker?: EksternLenkeI[];
  beskrivelse: string;
}

function useProjectData(): ProjectData {
  const lang = useLocale();
  const data = useStaticQuery(graphql`
    query Oppsett {
      oppsett: sanityOppsett {
        title: _rawTitle
        folketrygdensGrunnbellop
        komIgangLenker: _rawKomIgangLenker
        beskrivelse: _rawBeskrivelse
      }
    }
  `);

  const localizedData = localizeSanityContent(data, lang);

  if (!data.oppsett.folketrygdensGrunnbellop) {
    throw new Error("Kunne ikke hente grunnbelløp");
  }

  return {
    title: localizedData.oppsett.title,
    folketrygdensGrunnbellop: data.oppsett.folketrygdensGrunnbellop,
    komIgangLenker: localizedData.oppsett.komIgangLenker,
    beskrivelse: localizedData.oppsett.beskrivelse,
  };
}

export default useProjectData;
