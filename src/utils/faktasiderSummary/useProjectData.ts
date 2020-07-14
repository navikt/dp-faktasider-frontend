import { graphql, useStaticQuery } from 'gatsby';
import { useLocale } from '../../i18n/LocaleContext';
import { Translations } from '../../types/translations';
import localizeSanityContent from '../../i18n/localizeSanityContent';

interface Data {
  oppsett: {
    title: Translations<string>;
  };
}

export interface ProjectData {
  title: string;
}

function useProjectData(): ProjectData {
  const lang = useLocale();
  const data: Data = useStaticQuery(graphql`
    query Oppsett {
      oppsett: sanityOppsett {
        title: _rawTitle
      }
    }
  `);

  const localizedData = localizeSanityContent(data, lang);

  return {
    title: localizedData.oppsett.title,
  };
}

export default useProjectData;
