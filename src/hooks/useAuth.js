// Imports the useContext hook from react for accessing context
import { useContext } from "react";

//Imports the AuthContext created in the "AuthContext" file
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  //Use the useContext hook from react for accessing context values
  const authContext = useContext(AuthContext);

  // Throw an error if authContext is null or undefined, indicating that useAuth hook is being used ouside of an AuthProvider
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Returns the context value, which includes user data and authentication methods.
  return authContext;
};

// Exports the useAuth hook for use in other components
export default useAuth;
