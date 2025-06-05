import LoginForm from "../../../components/LoginForm/LoginForm";
import LoginValidation from "../../../components/LoginValidation/LoginValidation";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = ({ setLogged }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();
  const handleLogin = (FormData) => {
    const errorValidation = LoginValidation({ datos: FormData });
    if (Object.keys(errorValidation).length > 0) {
      if (errorValidation.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errorValidation.password && passwordRef.current) {
        passwordRef.current.focus();
      }
      setErrores(errorValidation);
    } else {
      fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((users) => {
          const usuario = users.find(
            (u) =>
              u.correo === FormData.email.trim() &&
              u.contraseña === FormData.password.trim()
          );
          if (usuario) {
            toast.success("¡Usuario ingresado correctamente!");
            setLogged(true);
            localStorage.setItem(
              "loggedUser",
              JSON.stringify({
                email: usuario.correo,
                password: usuario.contraseña,
                id: usuario.id,
              })
            );

            setTimeout(() => {
              if (
                usuario.correo === "admin@test.com" &&
                usuario.contraseña === "admin123"
              ) {
                navigate("/administration");
              } else {
                navigate("/home");
              }
            }, 2000);
          } else {
            toast.error("Ese usuario no está registrado.");
            setTimeout(() => {
              navigate("/register");
            }, 3500);
          }
        })
        .catch((err) => {
          console.error("Error al verificar usuario:", err);
          toast.error("Ocurrió un error al verificar el usuario.");
        });
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img src="images/auto.png" alt="auto azul" className="login-image" />
        </div>
        <div className="login-form-section">
          <LoginForm
            onSubmit={handleLogin}
            errores={errores}
            refs={{ emailRef, passwordRef }}
          />
        </div>
      </div>
      <p className="login-footer">© 2025 Todos los derechos reservados</p>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default Login;
