import { useMount } from 'react-use';
import useMetadata from '../../hooks/graphQl/useMetadata';
import { SupportedLanguage } from '../../i18n/supportedLanguages';

function useBreadcrumbs(title: string, path: string, lang: SupportedLanguage) {
  const metaData = useMetadata();

  useMount(() => {
    import('@navikt/nav-dekoratoren-moduler').then((dekoratorModuler) =>
      dekoratorModuler.setBreadcrumbs([
        { title: 'arbeid', url: `${metaData.siteUrl}/${lang}` },
        { title: title.toLowerCase(), url: `${metaData.siteUrl}${path}` },
      ])
    );
  });
}

export default useBreadcrumbs;
