import * as React from "react";
import FaktaSide from "../pages/[slug]";
import { Block } from "../utils/richTextUtils/richTextTypes";
import { faktaSideMockContext } from "./faktaSideMockContext";
import TestProvider from "./TestProvider";
import { FaktasideContext } from "../hooks/graphQl/fetchFaktaside";

type Props = {
  partialContext?: Partial<FaktasideContext>;
  innhold?: Block[];
};

function TestFaktaside(props: Props) {
  const context: FaktasideContext = {
    ...faktaSideMockContext,
    ...props.partialContext,
    innhold: props.innhold || props.partialContext?.innhold || faktaSideMockContext.innhold,
  };

  return (
    <TestProvider>
      {/* @ts-ignore */}
      <FaktaSide pageContext={context} location={{ pathname: "/test/" }} />
    </TestProvider>
  );
}

export default TestFaktaside;
