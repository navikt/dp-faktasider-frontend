import { useMount } from 'react-use';
import useMetadata from '../../hooks/graphQl/useMetadata';
import { SupportedLanguage } from '../../i18n/supportedLanguages';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler/dist';

function useBreadcrumbs(title: string, path: string, lang: SupportedLanguage) {
  const metaData = useMetadata();

  useMount(() => {
    setBreadcrumbs([
      { title: 'Arbeid', url: `${metaData.siteUrl}/${lang}` },
      { title: title, url: `${metaData.siteUrl}${path}` },
    ]);
  });
}

export default useBreadcrumbs;
