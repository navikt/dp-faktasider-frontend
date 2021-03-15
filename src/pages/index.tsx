import { GetStaticProps } from "next";
import { getClient, usePreviewSubscription } from "../sanity/sanity-config";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { useLocale } from "../i18n/useLocale";
import { forsideQuery, ForsideQueryData } from "../sanity/groq/forside/forsideQuery";
import parseForsideData from "../sanity/groq/forside/parseForsideData";
import { isDevelopment } from "../utils/environment";
import Forside from "../components/forside/Forside";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;
  const dataset = (enablePreview && (router.query.dataset as string)) || undefined;

  const { data: forsideData } = usePreviewSubscription(dataset)(forsideQuery, {
    initialData: props.forsideData,
    enabled: enablePreview,
  });

  const { data: menuData } = usePreviewSubscription(dataset)(menuQuery, {
    initialData: props.menuData,
    enabled: enablePreview,
  });

  const lang = useLocale();
  const parsedForsideData = parseForsideData(forsideData, lang);
  const parsedMenuData = parseMenuData(menuData, lang);

  return <Forside forsideData={parsedForsideData} menuData={parsedMenuData} />;
}
