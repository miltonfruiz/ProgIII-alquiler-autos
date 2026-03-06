import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  // Verificar si el usuario es admin o empleado
  const hasAccess =
    loggedUser &&
    (loggedUser.rol === "administrador" || loggedUser.rol === "empleado");

  if (hasAccess) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouteAdmin;
