import { GetStaticProps } from "next";
import { sanityClient } from "../sanity/sanity-config";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { useLocale } from "../i18n/useLocale";
import { forsideQuery, ForsideQueryData } from "../sanity/groq/forside/forsideQuery";
import parseForsideData from "../sanity/groq/forside/parseForsideData";
import { useSanityPreveiw } from "../sanity/useSanityPreview";
import { Arbeid } from "../views/arbeid/Arbeid";

interface Props {
  forsideData: ForsideQueryData;
  menuData: MenuQueryData;
  preview?: boolean;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const forsideData: ForsideQueryData = await sanityClient.fetch(forsideQuery);
  // const menuData: MenuQueryData = await sanityClient.fetch(menuQuery);

  // return {
  //   props: {
  //     forsideData,
  //     menuData,
  //   },
  //   revalidate: 120,
  // };

  return {
    redirect: {
      destination: "https://www.nav.no/arbeidsledig-permittert",
      statusCode: 308,
    },
  };
};

export default function ArbeidWrapper(props: Props) {
  const arbeidPageData = useSanityPreveiw(props.forsideData, forsideQuery);
  const menuData = useSanityPreveiw(props.menuData, menuQuery);

  const lang = useLocale();
  const parsedArbeidPageData = parseForsideData(arbeidPageData, lang);
  const parsedMenuData = parseMenuData(menuData, lang);

  return <Arbeid pageData={parsedArbeidPageData} menuData={parsedMenuData} />;
}
