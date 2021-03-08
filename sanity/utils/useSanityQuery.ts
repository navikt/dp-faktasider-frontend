import { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import { getDataset } from "./getDataset";

function useSanityQuery<Data>(query: string) {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const dataset = getDataset();
    const client = sanityClient({
      projectId: "rt6o382n",
      dataset: dataset,
    });
    client.fetch(query).then(setData).catch(setError);
  }, []);

  return { data, error };
}

export default useSanityQuery;
