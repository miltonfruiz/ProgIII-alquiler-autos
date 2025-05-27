import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const adminCredentials = {
    email: "admin@test.com",
    password: "admin123",
  };
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (
    loggedUser &&
    loggedUser.email === adminCredentials.email &&
    loggedUser.password === adminCredentials.password
  ) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedRouteAdmin;
