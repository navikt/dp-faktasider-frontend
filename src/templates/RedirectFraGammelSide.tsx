import * as React from 'react';
import { PageProps } from 'gatsby';
import { parseQueryParams } from '../utils/useQueryParams';
import { Helmet } from 'react-helmet';
import { idFromString } from '../utils/idFromString';
import { useMount } from 'react-use';
import { loggRedirect } from '../utils/logging';

type GammelURL = 'permittert' | 'arbeidsledig' | 'lærling' | 'student';

function RedirectFraGammelSide(props: PageProps<undefined, { slug: GammelURL }>) {
  const queryParams = parseQueryParams<{ lang?: string }>(props.location.search);

  const pathname = decodeURI(props.location.pathname);
  const slug = props.pageContext.slug;
  const hash = props.location.hash ? idFromString(decodeURI(props.location.hash)) : undefined;

  useMount(() => loggRedirect(pathname));

  function buildNewPath(newSlug: string, lang = 'no') {
    const nyPath = `${pathname.replace(`/dagpenger/${slug}`, `/${lang}/${newSlug}`)}`;
    return nyPath + (hash ? `#${hash}` : '');
  }

  function getNewPath() {
    switch (slug) {
      case 'permittert':
        if (queryParams.lang === 'en') {
          return buildNewPath('dagpenger-og-eos', 'en');
        } else {
          return buildNewPath(slug);
        }
      case 'arbeidsledig':
        return buildNewPath(slug);
      case 'lærling':
        return buildNewPath('laerling');
      case 'student':
        return buildNewPath(slug);
      default:
        return buildNewPath(slug);
    }
  }

  return (
    <div>
      Redirecting..
      <Helmet>
        <meta http-equiv="Refresh" content={`0; URL=${getNewPath()}`} />
      </Helmet>
    </div>
  );
}

export default RedirectFraGammelSide;
