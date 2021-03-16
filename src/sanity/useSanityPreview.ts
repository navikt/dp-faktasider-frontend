import { createPreviewSubscriptionHook } from "next-sanity";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { sanityConfig } from "./sanity-config";
import { isDevelopment } from "../utils/environment";
import { usePreviewContext } from "../components/Preview/previewContext";

export function useSanityPreveiw<Data>(initialData: Data, query: string, params?: Record<string, any>): Data {
  const router = useRouter();
  const enablePreview = router.query.preview === "true" || isDevelopment();
  const dataset = (router.query.dataset as string) || "production";
  const [context, dispatch] = usePreviewContext();

  useEffect(() => {
    enablePreview && dispatch({ previewMode: true, dataset: dataset, showDrafts: true });
  }, [enablePreview, dataset]);

  const usePreviewSubscription = useMemo(
    () => createPreviewSubscriptionHook({ ...sanityConfig, dataset: dataset || sanityConfig.dataset }),
    [dataset]
  );

  const { data: previewData, error } = usePreviewSubscription(query, { params, initialData, enabled: enablePreview });

  error && console.error(error);

  return context.showDrafts ? previewData : initialData;
}