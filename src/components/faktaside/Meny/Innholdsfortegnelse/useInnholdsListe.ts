import { useTranslation } from "react-i18next";
import { Group } from "../../../../utils/richTextUtils/richTextTypes";
import { useFaktasideContext } from "../../FaktaSideContext";
import { createH2Group } from "../../../../utils/richTextUtils/createGroup";
import { RichText } from "../../../../utils/richTextUtils/RichText";

export function useInnholdsListe(): Group[] {
  const { innhold, snarveier, kortFortalt } = useFaktasideContext();
  const { t } = useTranslation("global");

  if (!innhold) {
    return [];
  }

  let h2Groups = innhold.groups();

  if (kortFortalt) {
    h2Groups.unshift(createH2Group(t("kortFortalt"), kortFortalt));
  }

  if (snarveier?.length) {
    h2Groups.push(createH2Group(t("snarveier"), new RichText()));
  }

  return h2Groups;
}
