import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler/dist";
import { Breadcrumb } from "@navikt/nav-dekoratoren-moduler/dist/functions/breadcrumbs";
import { FaktasideContext } from "../../../gatsby-utils/createFaktasider";
import { useEffect } from "react";
import { useRouter } from "next/router";

function useBreadcrumbs(faktaside?: FaktasideContext) {
  const lang = useRouter().locale;
  const forsideUrl = `/${lang}/`;
  const faktasideUrl = faktaside && `${forsideUrl}${faktaside?.slug}`;

  onBreadcrumbClick((breadcrumb) => {
    switch (breadcrumb.url) {
      case forsideUrl:
        // @ts-ignore
        navigate(forsideUrl);
        break;
      case faktasideUrl:
        break;
    }
  });

  const breadcrumbs: Breadcrumb[] = [{ title: "projectData.title", url: forsideUrl, handleInApp: true }];

  if (faktasideUrl) {
    breadcrumbs.push({ title: faktaside?.title || "Du er her", url: faktasideUrl, handleInApp: true });
  }

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);
}

export default useBreadcrumbs;
