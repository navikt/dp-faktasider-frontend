import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function withErrorBoundary<Props>(Component: React.ComponentType<Props>) {
  return (props: Props) => {
    return (
      <ErrorBoundary info={`Feil i ${Component.name}`}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
