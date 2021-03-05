import * as React from "react";
import StringArrayAsChecboxesInput, { InputComponentProps } from "../../utils/StringArrayAsChecboxesInput";
import useSanityQuery from "../../../utils/useSanityQuery";
import withErrorBoundary from "../../../components/withErrorBoundary";
import { Translations } from "../../../../src/types/translations";

type FiltreringsValgData = Translations<string>[] | undefined;

const query = `*[_id == "oppsett"][0].filtreringsvalg`;

function VelgSituasjoner(props: InputComponentProps) {
  const { data } = useSanityQuery<FiltreringsValgData>(query);

  const valg = data?.map((it) => ({ value: valg.no || valg.en || "N/A", label: valg.no || valg.en || "N/A" }));

  return <StringArrayAsChecboxesInput {...props} tilgjengeligeValg={valg || []} />;
}

export default withErrorBoundary(VelgSituasjoner);
