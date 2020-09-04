import { graphql, useStaticQuery } from 'gatsby';
import { useLocale } from '../../i18n/LocaleContext';
import { Translations } from '../../types/translations';
import localizeSanityContent from '../../i18n/localizeSanityContent';

interface Data {
  oppsett: {
    title: Translations<string>;
    folketrygdensGrunnbellop: number;
  };
}

export interface ProjectData {
  title: string;
  folketrygdensGrunnbellop: number;
}

function useProjectData(): ProjectData {
  const lang = useLocale();
  const data: Data = useStaticQuery(graphql`
    query Oppsett {
      oppsett: sanityOppsett {
        title: _rawTitle
        folketrygdensGrunnbellop
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
  };
}

export default useProjectData;
