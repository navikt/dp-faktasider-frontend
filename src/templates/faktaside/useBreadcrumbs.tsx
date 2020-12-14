import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler/dist";
import useProjectData from "../../hooks/graphQl/useProjectData";
import { navigate } from "gatsby";
import { Breadcrumb } from "@navikt/nav-dekoratoren-moduler/dist/functions/breadcrumbs";
import { useLocale } from "../../i18n/LocaleContext";
import { FaktasideContext } from "../../../gatsby-utils/createFaktasider";
import { useEffect } from "react";

function useBreadcrumbs(faktaside?: FaktasideContext) {
  const projectData = useProjectData();
  const lang = useLocale();
  const forsideUrl = `/${lang}/`;
  const faktasideUrl = faktaside && `${forsideUrl}${faktaside?.slug}`;

  onBreadcrumbClick((breadcrumb) => {
    switch (breadcrumb.url) {
      case forsideUrl:
        navigate(forsideUrl);
        break;
      case faktasideUrl:
        break;
    }
  });

  const breadcrumbs: Breadcrumb[] = [{ title: projectData.title, url: forsideUrl, handleInApp: true }];

  if (faktasideUrl) {
    breadcrumbs.push({ title: faktaside?.title || "Du er her", url: faktasideUrl, handleInApp: true });
  }

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);
}

export default useBreadcrumbs;
