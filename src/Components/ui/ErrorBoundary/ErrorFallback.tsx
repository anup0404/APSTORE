import React from "react";

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  title?: string;
  message?: string;
  showReload?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  title = "Something went wrong",
  message = "Please try again later",
  showReload = false,
}) => {
  return (
    <div role="alert" className="p-4 border rounded bg-red-50">
      <h2 className="font-bold text-red-600">{title}</h2>
      <p className="text-gray-700">{message}</p>
      <pre className="text-sm text-gray-500">{error.message}</pre>
      {showReload && (
        <button
          onClick={resetErrorBoundary}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
        >
          Reload
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;
