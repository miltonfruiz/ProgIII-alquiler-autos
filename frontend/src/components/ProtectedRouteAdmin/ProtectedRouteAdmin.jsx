import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const adminEmails = ["admin@test.com"]; // Puedes tener múltiples admins

  if (loggedUser && adminEmails.includes(loggedUser.email)) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRouteAdmin;
