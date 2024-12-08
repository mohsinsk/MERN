import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authContext } from "./context/AuthContext";
import Loader from "./components/Loader";

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useContext(authContext);
  const location = useLocation();

  if (loading) return <Loader />; // Prevent premature redirects

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoutes;