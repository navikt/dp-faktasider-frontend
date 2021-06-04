import { useEffect } from "react";
import { useRouter } from "next/router";
import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { Breadcrumb } from "@navikt/nav-dekoratoren-moduler/csr/functions/breadcrumbs";

function useBreadcrumbs(forsideTittel?: string, sider?: { tittel: string; path: string }[]) {
  const navigate = useRouter().push;
  const forsideUrl = `/`;

  onBreadcrumbClick((breadcrumb) => {
    navigate(breadcrumb.url);
  });

  const breadcrumbs: Breadcrumb[] = [{ title: forsideTittel || "Forside", url: forsideUrl, handleInApp: true }];

  sider?.forEach((side) => {
    const sideUrl = `${forsideUrl}${side.path}`;
    breadcrumbs.push({ title: side.tittel, url: sideUrl!, handleInApp: true });
  });

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);
}

export default useBreadcrumbs;
