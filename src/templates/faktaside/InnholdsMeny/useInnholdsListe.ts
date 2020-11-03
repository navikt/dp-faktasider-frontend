import { useTranslation } from "react-i18next";
import { Group, isH2Group } from "../../../utils/richTextUtils/richTextTypes";
import { useFaktasideContext } from "../FaktaSideContext";
import { createH2Group } from "../../../utils/richTextUtils/createGroup";

export function useInnholdsListe(): Group[] {
  const { innhold, relatertInformasjon, kortFortalt } = useFaktasideContext();
  const { t } = useTranslation("global");

  if (!innhold) {
    return [];
  }

  let h2Groups = innhold.filter((block) => isH2Group(block)) as Group[];

  if (kortFortalt?.length) {
    h2Groups.unshift(createH2Group(t("kortFortalt"), []));
  }

  if (relatertInformasjon?.length) {
    h2Groups.push(createH2Group(t("relatertInformasjon"), []));
  }

  return h2Groups;
}
