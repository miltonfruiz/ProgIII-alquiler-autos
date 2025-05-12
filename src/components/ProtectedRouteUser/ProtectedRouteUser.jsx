import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({ isSigned, children }) => {
  if (!isSigned) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRouteUser;
