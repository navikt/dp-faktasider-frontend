import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";
import { FaktasideSanityPreview } from "./components/FaktasideSanityPreview";

export default () =>
  S.list()
    .title("Innhold")
    .items([
      S.listItem().title("Oppsett").icon(MdSettings).child(S.editor().schemaType("oppsett").documentId("oppsett")),
      ...S.documentTypeListItems().filter((listItem) => !["oppsett"].includes(listItem.getId())),
    ]);

export const getDefaultDocumentNode = ({ schemaType }) => {
  switch (schemaType) {
    case "faktaSide":
      return S.document().views([S.view.form(), S.view.component(FaktasideSanityPreview).title("Preview")]);
  }
};
