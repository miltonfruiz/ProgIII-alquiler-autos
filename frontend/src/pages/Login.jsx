import LoginForm from "../components/LoginForm/LoginForm";
import LoginValidation from "../components/LoginValidation/LoginValidation";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import UserNavbar from "../components/UserNavbar/UserNavbar";

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
      toast.success("¡Usuario ingresado correctamente!");
      setErrores({});
      setLogged(true);

      setTimeout(() => {
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ email: FormData.email, password: FormData.password })
        );

        if (
          FormData.email.trim() === "admin@test.com" &&
          FormData.password.trim() === "admin123"
        ) {
          navigate("/administration");
        } else {
          navigate("/login");
        }
      }, 2000);
    }
  };

  return (
    <div className="login-page">
      <UserNavbar />
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
