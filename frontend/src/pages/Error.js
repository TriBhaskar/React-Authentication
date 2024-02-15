// Importing the necessary dependencies
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

// Defining the ErrorPage component
function ErrorPage() {
  // Getting the error object from the route
  const error = useRouteError();

  // Initializing default title and message
  let title = "An error occurred!";
  let message = "Something went wrong!";

  // Updating the message based on the error status
  if (error.status === 500) {
    message = error.data.message;
  }

  // Updating the title and message for 404 errors
  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  // Rendering the ErrorPage component
  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

// Exporting the ErrorPage component as the default export
export default ErrorPage;
