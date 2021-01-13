/*
import { SupportedLanguage, supportedLanguages } from "../src/i18n/supportedLanguages";
import localizeSanityContent from "../src/i18n/localizeSanityContent";
import parseRichText, { ParsedRichText } from "../src/utils/richTextUtils/parser/parseRichText";
import { SanityBlock } from "../src/utils/richTextUtils/richTextTypes";
import { Translations } from "../src/types/translations";
import { Modify } from "../src/utils/typeUtils";
import { getPubliseringsTidspunkt } from "./getPubliseringstidspunkt";
import fjernOverflodigDokumentData from "../src/utils/richTextUtils/parser/fjernOverflodigDokumentData/fjernOverflodigDokumentData";
import { Notifikasjon } from "../src/templates/faktaside/Notifikasjoner";

// @ts-ignore
export const createFaktasider: GatsbyNode["createPages"] = async (props) => {
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
            beskrivelse: _rawBeskrivelse
            relatertInformasjon: _rawRelatertInformasjon
            slug {
              current
            }
            visSprakversjon {
              en
              no
            }
            visIngenValgPasser
            kortFortalt: _rawKortFortalt
          }
        }
      }
      oppsett: sanityOppsett {
        notifikasjoner: _rawNotifikasjoner(resolveReferences: { maxDepth: 3 })
      }
    }
  `);


  // @ts-ignore
  const notifikasjoner: Notifikasjon[] | undefined = fjernOverflodigDokumentData(result.data.oppsett.notifikasjoner);

  const pages = rawData.map((page) => createFaktasideContext(page, "no", notifikasjoner));
  reporter.info(`📄 Lager veiviser: /no/demoapp`);
  actions.createPage({
    path: "/no/demoapp",
    component: require.resolve("../src/templates/veiviser/Veiviser.tsx"),
    context: { pages },
  });


};
*/
