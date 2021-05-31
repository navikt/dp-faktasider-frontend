import { GetStaticProps } from "next";
import React from "react";
import Forside from "../../components/forside/Forside";
import { useLocale } from "../../i18n/useLocale";
import { forsideQuery, ForsideQueryData } from "../../sanity/groq/forside/forsideQuery";
import parseForsideData from "../../sanity/groq/forside/parseForsideData";
import { menuQuery, MenuQueryData } from "../../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../../sanity/groq/menu/parseMenuData";
import { getClient } from "../../sanity/sanity-config";
import { useSanityPreveiw } from "../../sanity/useSanityPreview";
import { isDevelopment } from "../../utils/environment";

interface Props {
  forsideData: ForsideQueryData;
  menuData: MenuQueryData;
  preview?: boolean;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const preview = !!context.preview || isDevelopment();
  const forsideData: ForsideQueryData = await getClient(preview).fetch(forsideQuery);
  const menuData: MenuQueryData = await getClient(preview).fetch(menuQuery);
  return {
    props: {
      forsideData,
      menuData,
      preview,
    },
    revalidate: 120,
  };
};

export default function ForsideWrapper(props: Props) {
  const forsideData = useSanityPreveiw(props.forsideData, forsideQuery);
  const menuData = useSanityPreveiw(props.menuData, menuQuery);

  const lang = useLocale();
  const parsedForsideData = parseForsideData(forsideData, lang);
  const parsedMenuData = parseMenuData(menuData, lang);

  return <Forside forsideData={parsedForsideData} menuData={parsedMenuData} />;
}
