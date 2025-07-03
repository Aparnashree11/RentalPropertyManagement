import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = jwtDecode(token);
  const userRole = decoded.role;

  if (allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
