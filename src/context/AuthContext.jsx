// Imports React context, state management hooks
import { createContext, useState } from "react";

// Imports a pre-configuration axios instance for making API requests
import axiosInstance from "../utils/axiosConfig";

// Imports react hot toast for displaying notification.
import toast from "react-hot-toast";

// Imports useNavigate for programmatic navigation
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//Creates a new context for authentication, which will hold authentication data and methods.
const AuthContext = createContext();

// Exports the context to be used in other components
export default AuthContext;

export const AuthProvider = ({ children }) => {
  //State to store user information... initially set to null
  const [user, setUser] = useState(null);

  //State to store the authentication token... initially with the token from localstorage OR null
  // initialize token from localStorage as plain string or null
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  // State to track wether an authentication request is in progress.
  const [authenticating, setAuthenticating] = useState(false);

  // Initiallzes useNavigate for navigating  programmatically.
  const navigate = useNavigate();

  const handleRegisterUser = async (formData) => {
    // Sets authenticating state to true while the registration request is in progress.
    setAuthenticating(true);

    try {
      //Sends a POST request to sign up the user with the provided form data
      const { data } = await axiosInstance.post("/api/auth/register", formData);

      // Displays a success toast notification
      toast.success("Registration Successful", { id: "uufdgtr" });

      // Stores the recevied token in localStorage.
      localStorage.setItem("token", data.token);

      // Updates the token state
      setToken(data.token);

      //Sets the user state with the user,s ID.
      setUser({ id: data.id });

      // Navigates to the home page after successful sign-up
      navigate("/");
    } catch (error) {
      // Handles any errors that occur during registeration
      handleAuthError(error);
    } finally {
      // Resets the authenticating state to false once the request is complete
      setAuthenticating(false);
    }
  };

  const handleLoginUser = async (formData) => {
    // Sets authenticating state to true while the login request is in progress.
    setAuthenticating(true);

    try {
      //Sends a POST request to login the user with the provided form data
      const { data } = await axiosInstance.post("/api/auth/login", formData);

      // Displays a success toast notification
      toast.success("Welcome Back", { id: "hcgmg" });

      // Stores the recevied token in localStorage.
      localStorage.setItem("token", data.token);

      // Updates the token state
      setToken(data.token);

      //Sets the user state with the user,s ID.
      setUser({ id: data.id });

      // Navigates to the home page after successful login
      navigate("/");
    } catch (error) {
      // Handles any errors that occur during login
      handleAuthError(error);
    } finally {
      // Resets the authenticating state to false once the request is complete
      setAuthenticating(false);
    }
  };

  const handleGetUser = async () => {
    // sends a POST request to get the user's data with the token included in the Authorization header.
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Updates the user state with the received data
      setUser(data);
    } catch (error) {
      // Handles any errors that occur while fetching user data
      handleAuthError(error);
    }
  };

  const handleLogOutUser = () => {
    // Clear the user state
    setUser(null);

    //clears the token state
    setToken(null);

    //Remove the token from localstorage
    localStorage.removeItem("token");

    //displat a success toast notification
    toast.success("See you soon", { id: "lllkk" });

    //Navigate to the home page after logging out
    navigate("/signin");
  };

  const handleAuthError = (error) => {
    // If there's a response from the server with an error message
    if (error.response) {
      // toast.error(error.response.data.message, { id: "bee" });
    } else {
      // if no response is recieved when trying to sign-up or login
      toast.error("Something went wrong", { id: "qasw" });
    }
  };

  //Fetchees the user data when the component mounts or token changes
  useEffect(() => {
    handleGetUser();
  }, [token]); // Dependency arry includes "token", so the effect runs whenever the token changes.

  // defines the context value with authentication data and methods.
  const contextData = {
    user,
    token,
    handleRegisterUser,
    handleLoginUser,
    authenticating,
    handleGetUser,
    handleLogOutUser,
  };

  //Provide the authentication context to all child components
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
