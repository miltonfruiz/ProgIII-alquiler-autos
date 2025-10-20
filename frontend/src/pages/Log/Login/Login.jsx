import LoginForm from "../../../components/LoginForm/LoginForm";
import LoginValidation from "../../../components/LoginValidation/LoginValidation";
import UserNavbar from "../../../components/UserNavbar/UserNavbar";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: FormData.email.trim(),
          contraseña: FormData.password.trim(),
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => {
              throw new Error(error.error || "Error en el login");
            });
          }
          return res.json();
        })
        .then((data) => {
          toast.success("¡Usuario ingresado correctamente!");

          setLogged(true);
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({
              email: data.user.correo,
              id: data.user.id,
              nombre: data.user.nombre,
            })
          );

          setTimeout(() => {
            if (data.user.correo === "admin@test.com") {
              navigate("/administration");
            } else {
              navigate("/home");
            }
          }, 2000);
        })
        .catch((err) => {
          console.error("Error al verificar usuario:", err);

          if (err.message.includes("Usuario no encontrado")) {
            toast.error("Ese usuario no está registrado.");
            setTimeout(() => {
              navigate("/register");
            }, 3500);
          } else if (err.message.includes("Contraseña incorrecta")) {
            toast.error("Contraseña incorrecta.");
          } else {
            toast.error("Ocurrió un error al verificar el usuario.");
          }
        });
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="login-page">
        <div className="login-container">
          <LoginForm
            onSubmit={handleLogin}
            errores={errores}
            refs={{ emailRef, passwordRef }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
