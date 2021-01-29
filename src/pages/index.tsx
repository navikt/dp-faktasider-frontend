import { GetStaticProps } from "next";
import { getClient, usePreviewSubscription } from "../sanity/sanity-config";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { useLocale } from "../i18n/useLocale";
import { forsideQuery, ForsideQueryData } from "../sanity/groq/forside/forsideQuery";
import parseForsideData from "../sanity/groq/forside/parseForsideData";
import { isDevelopment } from "../utils/environment";
import Forside from "../components/forside/Forside";

interface Props {
  forsideData: ForsideQueryData;
  menuData: MenuQueryData;
  preview: boolean;
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
  };
};

export default function PreviewWrapper(props: Props) {
  const { data: forsideData } = usePreviewSubscription(forsideQuery, {
    initialData: props.forsideData,
    enabled: props.preview,
  });

  const { data: menuData } = usePreviewSubscription(menuQuery, {
    initialData: props.menuData,
    enabled: props.preview,
  });

  const lang = useLocale();
  const parsedForsideData = parseForsideData(forsideData, lang);
  const parsedMenuData = parseMenuData(menuData, lang);

  return <Forside forsideData={parsedForsideData} menuData={parsedMenuData} />;
}
