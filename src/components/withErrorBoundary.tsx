import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function withErrorBoundary<T>(
  Component: React.ComponentType<T>,
  boundaryName?: string
): React.ComponentType<T> {
  return (props: T) => {
    return (
      <ErrorBoundary boundaryName={boundaryName}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
