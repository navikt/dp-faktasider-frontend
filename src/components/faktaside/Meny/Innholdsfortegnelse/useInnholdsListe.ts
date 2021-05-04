import { useTranslation } from "react-i18next";
import { useFaktasideContext } from "../../FaktaSideContext";
import { Group } from "../../../../utils/richTextUtils/Group";
import { createGroup } from "../../../../utils/richTextUtils/createGroup";
import { RichText } from "../../../../utils/richTextUtils/RichText";

export function useInnholdsListe(): Group[] {
  const { innhold, snarveier, kortFortalt } = useFaktasideContext();
  const { t } = useTranslation("global");

  if (!innhold) {
    return [];
  }

  let h2Groups = innhold.groups();

  if (kortFortalt) {
    h2Groups.unshift(createGroup(t("kortFortalt"), kortFortalt));
  }

  if (snarveier?.length) {
    h2Groups.push(createGroup(t("snarveier"), new RichText()));
  }

  return h2Groups;
}
