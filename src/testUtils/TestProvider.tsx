import * as React from "react";
import { createContext, ReactNode, useContext } from "react";
import { isTest } from "../utils/environment";
import { mockMenuData } from "../sanity/groq/menu/mockMenuData";
import { ExternalMenuLinkData } from "../sanity/groq/menu/menuDataUtils";

const initial = {
  isTest: isTest(),
  menuData: mockMenuData,
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
