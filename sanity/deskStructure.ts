import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";
import FaktasidePreview from "./previews/FaktasidePreview";
import FaktasideSEOPreview from "./previews/FaktasideSEOPreview";
import ForsideSEOPreview from "./previews/ForsideSEOPreview";

export default () =>
  S.list()
    .title("Innhold")
    .items([
      S.listItem()
        .title("Oppsett")
        .icon(MdSettings)
        .child(
          S.editor()
            .schemaType("oppsett")
            .documentId("oppsett")
            .views([S.view.form(), S.view.component(ForsideSEOPreview).title("SEO")])
        ),
      ...S.documentTypeListItems().filter((listItem) => !["oppsett"].includes(listItem.getId())),
    ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "faktaSide":
      return S.document().views([
        S.view.form(),
        S.view.component(FaktasidePreview).title("Preview"),
        S.view.component(FaktasideSEOPreview).title("SEO"),
      ]);
  }
};
