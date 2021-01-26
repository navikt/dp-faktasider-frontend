import * as React from "react";
import { Block } from "../utils/richTextUtils/richTextTypes";
import { faktaSideMockContext } from "./faktaSideMockContext";
import TestProvider from "./TestProvider";
import { FaktasideContext } from "../hooks/graphQl/fetchFaktaside";
import FaktaSide from "../components/faktaside/Faktaside";
import { FaktaSideProps } from "../components/faktaside/types";

type Props = {
  partialContext?: Partial<FaktasideContext>;
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
