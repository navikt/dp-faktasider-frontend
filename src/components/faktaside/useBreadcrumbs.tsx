import { useEffect } from "react";
import { useRouter } from "next/router";
import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";

function useBreadcrumbs(forsideTittel?: string, sider?: { tittel: string; path: string }[]) {
  const { push: navigate, basePath } = useRouter();
  const forsideUrl = `${basePath}/start`;

  onBreadcrumbClick((breadcrumb) => {
    navigate(breadcrumb.url.replace(`${basePath}`, ""));
  });

  const breadcrumbs = [{ title: forsideTittel || "Forside", url: forsideUrl, handleInApp: true }];

  sider?.forEach((side) => {
    const sideUrl = `${forsideUrl}${side.path}`;
    breadcrumbs.push({ title: side.tittel, url: sideUrl, handleInApp: true });
  });

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);
}

export default useBreadcrumbs;
