import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authContext } from "./context/AuthContext";

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useContext(authContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>; // Prevent premature redirects

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoutes;