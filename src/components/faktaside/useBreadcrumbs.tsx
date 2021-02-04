import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler/dist";
import { Breadcrumb } from "@navikt/nav-dekoratoren-moduler/dist/functions/breadcrumbs";
import { useEffect } from "react";
import { useRouter } from "next/router";

function useBreadcrumbs(forsideTittel?: string, side?: { tittel: string; slug: string }) {
  const navigate = useRouter().push;
  const forsideUrl = `/`;
  const faktasideUrl = side && `${forsideUrl}${side.slug}`;

  onBreadcrumbClick((breadcrumb) => {
    switch (breadcrumb.url) {
      case forsideUrl:
        navigate(forsideUrl);
        break;
      case faktasideUrl:
        break;
    }
  });

  const breadcrumbs: Breadcrumb[] = [{ title: forsideTittel || "Forside", url: forsideUrl, handleInApp: true }];

  if (side) {
    breadcrumbs.push({ title: side.tittel, url: faktasideUrl!, handleInApp: true });
  }

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);
}

export default useBreadcrumbs;
