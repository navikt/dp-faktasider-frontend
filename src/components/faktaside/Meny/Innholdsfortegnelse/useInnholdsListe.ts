import { useTranslation } from "react-i18next";
import { useFaktasideContext } from "../../FaktaSideContext";
import { createH2Group } from "../../../../utils/richTextUtils/createGroup";
import { Group, isH2Group } from "../../../../utils/richTextUtils/parser/groupParser/groupParser";
import { Block } from "../../../../utils/richTextUtils/richTextTypes";

export function useInnholdsListe(): Group[] {
  const { innhold, snarveier } = useFaktasideContext();
  const { t } = useTranslation("global");

  if (!innhold) {
    return [];
  }

  const h2Groups = innhold.filter((block: Block) => isH2Group(block)) as Group[];

  h2Groups.unshift(createH2Group(t("kortFortalt"), []));

  if (snarveier?.length) {
    h2Groups.push(createH2Group(t("snarveier"), []));
  }

  return h2Groups;
}
