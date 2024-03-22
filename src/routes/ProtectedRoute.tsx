import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userAccount } = useWalletStore();

  if (!userAccount) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
