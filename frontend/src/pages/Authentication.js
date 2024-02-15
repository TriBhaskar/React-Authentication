// Import necessary dependencies
import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

// Define the AuthenticationPage component
function AuthenticationPage() {
  return <AuthForm />;
}

// Export the AuthenticationPage component as the default export
export default AuthenticationPage;

// Define the action function that handles the authentication logic
export async function action({ request }) {
  // Extract the mode parameter from the request URL
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  // Validate the mode parameter
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Invalid mode" }, { status: 422 });
  }

  // Parse the form data from the request
  const data = await request.formData();

  // Extract the email and password from the form data
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // Send a POST request to the authentication endpoint
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  // Handle error responses
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  // Throw an error if the response is not successful
  if (!response.ok) {
    throw json({ message: "Authentication failed" }, { status: 500 });
  }

  // Redirect to the home page on successful authentication
  return redirect("/");
}
