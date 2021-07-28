import * as React from "react";
import { InputComponentProps } from "../../../utils/StringArrayAsChecboxesInput";
import useSanityQuery from "../../../../utils/useSanityQuery";
import withErrorBoundary from "../../../../components/withErrorBoundary";
import RefArrayAsChecboxesInput from "../../../utils/RefArrayAsChecboxesInput";

type Valg = {
  name: { _type: "localeString"; en: string; no: string };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "situasjon";
  _updatedAt: string;
};

const query = `*[_type == "situasjon"]`;

function VelgSituasjonerRef(props: InputComponentProps) {
  const { data } = useSanityQuery<Valg[]>(query);

  const valg = data?.map((it) => ({ ref: {}, label: it.name.no || it.name.en || "N/A" }));

  return <RefArrayAsChecboxesInput {...props} tilgjengeligeValg={valg || []} />;
}

export default withErrorBoundary(VelgSituasjonerRef);
