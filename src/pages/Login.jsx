import LoginForm from "../components/LoginForm/LoginForm";
import LoginValidation from "../components/LoginValidation/LoginValidation";
import { useRef, useState } from "react";
import "./Login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errores, setErrores] = useState({});

  const handleLogin = (FormData) => {
    const errores = LoginValidation({ datos: FormData });
    if (Object.keys(errores).length > 0) {
      if (errores.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errores.password && passwordRef.current) {
        passwordRef.current.focus();
      }
      setErrores(errores);
    } else {
      setErrores({});
      alert("Usuario ingresado correctamente!");
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
