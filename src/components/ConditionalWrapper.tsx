import React from "react";
import { ReactNode } from "react";

interface Props {
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
  children: ReactNode;
}

export function ConditionalWrapper({ condition, wrapper, children }: Props) {
  return <>{condition ? wrapper(children) : children}</>;
}
