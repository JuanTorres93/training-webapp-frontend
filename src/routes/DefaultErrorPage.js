// Hook to be able to reference the thrown error
import { useRouteError } from "react-router-dom";

// Default error page to be redirected in case of an error
export default function DefaultErrorPage() {
  // Get error
  const error = useRouteError();

  // Return generic error page using error info
  return (
    <div id="id-error-page">
      <h1>oops!</h1>
      <p>Sorry, an unexpected error has ocurred.</p>
      <p>
        <i>
          {error.status} {error.statusText}
        </i>
      </p>
    </div>
  );
}
