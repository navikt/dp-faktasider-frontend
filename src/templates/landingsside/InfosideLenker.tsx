import { useTranslation } from "react-i18next";
import React from "react";
import { ForsideLenkePanel } from "./ForsideLenkePanel";
import { MenuItem } from "../../hooks/graphQl/menuDataUtils";
import { EksternLenke, InternLenke } from "./ForsideLenker";

function InfosideLenker(props: { lenker: MenuItem[] }) {
  const { t } = useTranslation("global");

  return (
    <ForsideLenkePanel title={t("forsideInformasjonHeader")} hideTitle={true}>
      {props.lenker.map((lenke) =>
        lenke.type === "internal" ? (
          <InternLenke lenke={lenke} key={lenke.id} />
        ) : (
          <EksternLenke lenke={lenke} key={lenke.url} />
        )
      )}
    </ForsideLenkePanel>
  );
}

export default InfosideLenker;
