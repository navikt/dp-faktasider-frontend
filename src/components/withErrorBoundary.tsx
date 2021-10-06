import React, { PropsWithChildren } from "react";
import ErrorBoundary from "./ErrorBoundary";

export function withErrorBoundary<Props>(Component: React.ComponentType<Props>, boundaryName: string) {
  // eslint-disable-next-line react/display-name
  return (props: PropsWithChildren<Props>) => (
    <ErrorBoundary boundaryName={boundaryName}>
      <Component {...props} />
    </ErrorBoundary>
  );
}
