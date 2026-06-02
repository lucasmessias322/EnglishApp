import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

interface PrivateRoutesProps {
  requiredRoles: string[];
}

const PrivateRoutes = ({ requiredRoles }: PrivateRoutesProps) => {
  const { token, userData } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/account/login" />;
  }

  if (!userData.role?.length) {
    return null;
  }

  const hasRequiredRoles = requiredRoles.some((role) =>
    userData.role?.includes(role),
  );

  if (!hasRequiredRoles) {
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
