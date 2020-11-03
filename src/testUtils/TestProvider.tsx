import * as React from "react";
import { createContext, ReactNode, useContext } from "react";
import { isTest } from "../utils/environment";
import { mockFaktasiderMenuData } from "../hooks/graphQl/mockFaktasiderMenuData";
import { ExternalMenuLinkData } from "../hooks/graphQl/menuDataUtils";

const initial = {
  isTest: isTest(),
  menuData: mockFaktasiderMenuData,
};

const TestContext = createContext(initial);

export const useTestContext = () => useContext(TestContext);

interface Props {
  children: ReactNode;
  menuData?: ExternalMenuLinkData[];
}

function TestProvider(props: Props) {
  const { children, ...rest } = props;
  return <TestContext.Provider value={{ ...initial, ...rest, isTest: true }}>{props.children}</TestContext.Provider>;
}

export default TestProvider;
