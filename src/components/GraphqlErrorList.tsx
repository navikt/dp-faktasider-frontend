import * as React from 'react';
import withErrorBoundary from './withErrorBoundary';

const GraphQLErrorList = ({ errors }) => {
  if (!errors) {
    return null;
  }

  return (
    <div>
      <h1>GraphQL Error</h1>
      {errors.map((error) => (
        <pre key={error.message}>{error.message}</pre>
      ))}
    </div>
  );
};

export default withErrorBoundary(GraphQLErrorList);
