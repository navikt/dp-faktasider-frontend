import * as React from "react";
import { Block } from "../utils/richTextUtils/richTextTypes";
import { faktaSideMockContext } from "./faktaSideMockContext";
import TestProvider from "./TestProvider";
import FaktaSide from "../components/faktaside/Faktaside";
import { FaktasideParsedData } from "../sanity/groq/faktaside/parseFaktasideData";

type Props = {
  partialContext?: Partial<FaktasideParsedData>;
  innhold?: Block[];
};

function TestFaktaside(props: Props) {
  const context: FaktaSideProps = {
    ...faktaSideMockContext,
    ...props.partialContext,
    innhold: props.innhold || props.partialContext?.innhold || faktaSideMockContext.innhold,
  };

  return (
    <TestProvider>
      <FaktaSide {...context} />
    </TestProvider>
  );
}

export default TestFaktaside;
