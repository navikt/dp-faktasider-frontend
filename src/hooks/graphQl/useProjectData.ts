import { graphql, useStaticQuery } from 'gatsby';
import { useLocale } from '../../i18n/LocaleContext';
import localizeSanityContent from '../../i18n/localizeSanityContent';

interface EktsernLenke {
  title: string;
  description: string;
  url: string;
}

export interface ProjectData {
  title: string;
  folketrygdensGrunnbellop: number;
  eksterneLenker: EktsernLenke[];
  ingress: string;
}

function useProjectData(): ProjectData {
  const lang = useLocale();
  const data = useStaticQuery(graphql`
    query Oppsett {
      oppsett: sanityOppsett {
        title: _rawTitle
        folketrygdensGrunnbellop
        eksterneLenker: _rawEksterneLenker
        ingress: _rawIngress
      }
    }
  `);

  const localizedData = localizeSanityContent(data, lang);

  if (!data.oppsett.folketrygdensGrunnbellop) {
    throw new Error('Kunne ikke hente grunnbelløp');
  }

  return {
    title: localizedData.oppsett.title,
    folketrygdensGrunnbellop: data.oppsett.folketrygdensGrunnbellop,
    eksterneLenker: localizedData.oppsett.eksterneLenker,
    ingress: localizedData.oppsett.ingress,
  };
}

export default useProjectData;
