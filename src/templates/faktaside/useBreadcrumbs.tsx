import { useMount } from "react-use";
import { onBreadcrumbClick, setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler/dist";
import useProjectData from "../../hooks/graphQl/useProjectData";
import { navigate } from "gatsby";
import { Breadcrumb } from "@navikt/nav-dekoratoren-moduler/dist/functions/breadcrumbs";

function useBreadcrumbs(faktasideTittel?: string) {
  const projectData = useProjectData();

  onBreadcrumbClick((breadcrumb) => {
    switch (breadcrumb.url) {
      case "forside":
        navigate("/no/");
        break;
      case "current":
        break;
    }
  });

  const breadcrumbs: Breadcrumb[] = [{ title: projectData.title, url: `forside`, handleInApp: true }];

  if (faktasideTittel) {
    breadcrumbs.push({ title: faktasideTittel, url: "current", handleInApp: true });
  }

  useMount(() => {
    setBreadcrumbs(breadcrumbs);
  });
}

export default useBreadcrumbs;
