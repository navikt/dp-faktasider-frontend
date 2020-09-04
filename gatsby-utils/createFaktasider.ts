import { GatsbyNode } from 'gatsby';
import { SupportedLanguage, supportedLanguages } from '../src/i18n/supportedLanguages';
import localizeSanityContent from '../src/i18n/localizeSanityContent';
import parseRichText, { ParsedRichText } from '../src/utils/richTextUtils/parser/parseRichText';
import { SanityBlock } from '../src/utils/richTextUtils/richTextTypes';
import { Translations } from '../src/types/translations';
import { Modify } from '../src/utils/typeUtils';
import { getPubliseringsTidspunkt } from './getPubliseringstidspunkt';

export interface RawFaktasideData {
  id: string;
  _updatedAt: string;
  title?: Translations<string>;
  ingress?: Translations<string>;
  innhold?: Translations<SanityBlock[]>;
  relatertInformasjon?: Translations<SanityBlock[]>;
  slug?: {
    current: string;
  };
  visSprakversjon?: {
    en: boolean;
    no: boolean;
  };
  visIngenValgPasser?: boolean;
}

export type LocalizedFaktasideData = Modify<
  RawFaktasideData,
  {
    title?: string;
    ingress?: string;
    innhold?: SanityBlock[];
    relatertInformasjon?: SanityBlock[];
  }
>;

export type FaktasideContext = Modify<
  Omit<LocalizedFaktasideData, '_updatedAt'>,
  {
    lang: SupportedLanguage;
    innhold: ParsedRichText;
    publiseringsTidspunkt: string;
    rawData: Pick<RawFaktasideData, 'title'>;
    slug: string;
  }
>;

export const createFaktasider: GatsbyNode['createPages'] = async (props) => {
  const { graphql, actions, reporter } = props;
  const result = await graphql(`
    query Pages {
      pages: allSanityFaktaSide {
        edges {
          node {
            id
            _updatedAt
            innhold: _rawInnhold(resolveReferences: { maxDepth: 13 })
            title: _rawTitle
            ingress: _rawIngress
            relatertInformasjon: _rawRelatertInformasjon
            slug {
              current
            }
            visSprakversjon {
              en
              no
            }
            visIngenValgPasser
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  // @ts-ignore
  const pageEdges = result.data.pages.edges || [];

  pageEdges.forEach((edge) => {
    const page = edge.node as RawFaktasideData;
    const slug = page.slug?.current;

    if (!slug) {
      return;
    }

    const path = `/${slug}/`;
    reporter.info(`🚧 Lager redirect fra ${path} til /no${path}`);
    actions.createRedirect({ fromPath: `/${path}`, toPath: `/no/${path}`, isPermanent: true });

    supportedLanguages.forEach((lang) => {
      const localePath = `/${lang}/${slug}/`;
      reporter.info(`📄 Lager faktaside: ${localePath}`);

      actions.createPage({
        path: localePath,
        component: require.resolve('../src/templates/faktaside/FaktaSide.tsx'),
        context: createFaktasideContext(page, lang),
      });
    });
  });
};

export function createFaktasideContext(page: RawFaktasideData, lang: SupportedLanguage): FaktasideContext {
  const localizedPage = localizeSanityContent(page, lang) as LocalizedFaktasideData;
  const parsedInnhold = parseRichText(localizedPage.innhold);
  const publiseringsTidspunkt = getPubliseringsTidspunkt(localizedPage);

  return {
    ...localizedPage,
    innhold: parsedInnhold,
    lang,
    slug: page.slug?.current || 'N/A',
    publiseringsTidspunkt,
    rawData: {
      title: page.title,
    },
  };
}
