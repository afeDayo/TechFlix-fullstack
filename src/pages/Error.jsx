import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="error-container">
      <h2>Error 404 - Page Not Found</h2>
      <p>Sorry, the requested page could not be found.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default PageNotFound;
