import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoutes = () => {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/loginregister/true" />;
};

export default PrivateRoutes;
