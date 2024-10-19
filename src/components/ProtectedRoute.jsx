import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("pa_token");

  // If the token is not present, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token is present, render the children componentss
  return children;
};

export default ProtectedRoute;
