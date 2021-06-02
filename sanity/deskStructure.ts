import S from "@sanity/desk-tool/structure-builder";
import { DagpengeKalkulatorIkon } from "./schemas/kalkulator/kalkulator";
import { infosideDeskStructure } from "./npm-package-candidate/sanity/deskStructure";

export default () =>
  S.list()
    .title("Innhold")
    .items([
      ...infosideDeskStructure.items,
      ...S.documentTypeListItems().filter(
        (listItem) => ![...infosideDeskStructure.singletons, "dagpengekalkulator"].includes(listItem.getId())
      ),
      S.listItem()
        .title("DagpengerKalkulator")
        .icon(DagpengeKalkulatorIkon)
        .child(S.editor().schemaType("dagpengekalkulator").documentId("dagpengekalkulator")),
    ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  const node = infosideDeskStructure.getDefaultDocumentNode({ schemaType });
  if (node) {
    return node;
  }
  /*
   * Dine egne getDefaultDocumentNode-implementasjoner her
   * */
};
