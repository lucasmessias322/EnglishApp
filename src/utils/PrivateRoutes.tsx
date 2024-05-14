import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoutes = ({ requiredRoles }) => {
  const { userData } = useContext(AuthContext);

  // Verifica se o usuário está autenticado
  if (!userData) {
    return <Navigate to="/account/login" />;
  }

  // Verifica se o usuário possui as roles necessárias
  const hasRequiredRoles = requiredRoles.some((role) =>
    userData.role.includes(role)
  );
  if (!hasRequiredRoles) {
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
