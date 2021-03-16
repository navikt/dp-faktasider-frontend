import { createPreviewSubscriptionHook } from "next-sanity";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { sanityConfig } from "./sanity-config";

export function useSanityPreveiw<Data>(initialData: Data, query: string, params?: Record<string, any>): Data {
  const router = useRouter();
  const enablePreview = router.query.preview === "true";
  const dataset = router.query.dataset as string | undefined;

  const usePreviewSubscription = useMemo(
    () => createPreviewSubscriptionHook({ ...sanityConfig, dataset: dataset || sanityConfig.dataset }),
    [dataset]
  );

  const { data: previewData } = usePreviewSubscription(query, { params, initialData, enabled: enablePreview });

  return enablePreview ? previewData : initialData;
}
