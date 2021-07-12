import { GetStaticProps } from "next";
import { sanityClient } from "../sanity/sanity-config";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { useLocale } from "../i18n/useLocale";
import { forsideQuery, ForsideQueryData } from "../sanity/groq/forside/forsideQuery";
import parseForsideData from "../sanity/groq/forside/parseForsideData";
import Forside from "../components/forside/Forside";
import { useSanityPreveiw } from "../sanity/useSanityPreview";

interface Props {
  forsideData: ForsideQueryData;
  menuData: MenuQueryData;
  preview?: boolean;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const forsideData: ForsideQueryData = await sanityClient.fetch(forsideQuery);
  const menuData: MenuQueryData = await sanityClient.fetch(menuQuery);
  return {
    props: {
      forsideData,
      menuData,
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
