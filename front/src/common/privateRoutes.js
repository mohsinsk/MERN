import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "./context/AuthContext";

export default function PrivateRoutes() {
  const { token } = useContext(authContext);
  return token ? <Outlet /> : <Navigate to="/login" />;
}
