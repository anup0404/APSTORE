import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import type { ErrorFallbackProps } from "./ErrorFallback";

function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallbackProps?: Partial<ErrorFallbackProps>
): React.FC<P> {
  const Wrapped: React.FC<P> = (props) => (
    <ErrorBoundary
      FallbackComponent={(fp) => <ErrorFallback {...fp} {...fallbackProps} />}
    >
      <Component {...props} />
    </ErrorBoundary>
  );

  Wrapped.displayName = `withErrorBoundary(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
}

export default withErrorBoundary;
