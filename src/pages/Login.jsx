import LoginForm from "../components/LoginForm/LoginForm";
import LoginValidation from "../components/LoginValidation/LoginValidation";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
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
      setErrores({});
      alert("Usuario ingresado correctamente!");
      setTimeout(() => {
        navigate("/testhome");
      }, 2000);
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
    </div>
  );
};

export default Login;
