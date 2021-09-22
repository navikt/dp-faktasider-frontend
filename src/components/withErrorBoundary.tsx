import React from "react";
import ErrorBoundary from "./ErrorBoundary";

export default function withErrorBoundary<Props>(Component: React.ComponentType<Props>, boundaryName: string) {
  // eslint-disable-next-line react/display-name
  return (props: Props) => (
    <ErrorBoundary boundaryName={boundaryName}>
      <Component {...props} />
    </ErrorBoundary>
  );
}
