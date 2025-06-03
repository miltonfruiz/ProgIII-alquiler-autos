import React, { useRef, useState } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import RegisterValidation from "../components/RegisterValidation/RegisterValidation";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";

const Register = ({ setRegisterIn }) => {
  const useRefs = {
    nameRegister: useRef(null),
    lastNameRegister: useRef(null),
    emailRegister: useRef(null),
    passwordRegister: useRef(null),
    verifyPasswordRegister: useRef(null),
    dniRegister: useRef(null),
    nacimientoRegister: useRef(null),
    licenciaRegister: useRef(null),
  };

  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const arrayErrores = [
    "name",
    "lastName",
    "email",
    "password",
    "verifyPassword",
    "dni",
    "nacimiento",
    "licencia",
  ];

  const handleSubmit = async (formRegister) => {
    const erroresRegister = RegisterValidation({ datos: formRegister });

    if (Object.keys(erroresRegister).length > 0) {
      arrayErrores.forEach((error) => {
        const keyRef = `${error}Register`;
        if (erroresRegister[error] && useRefs[keyRef].current) {
          useRefs[keyRef].current.focus();
        }
      });
      setErrores(erroresRegister);
    } else {
      console.log(formRegister);
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRegister),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            console.log("datos guardados");
          } else {
            console.log("error al enviar el formulario");
          }
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
          console.log(res);
        });

      toast.success("¡Usuario registrado correctamente!");
      setErrores({});
      setRegisterIn(true);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  };

  return (
    <div>
      <UserNavbar />
      <RegisterForm
        onSubmit={handleSubmit}
        errores={errores}
        refs={{
          useRefs,
        }}
      />
      <ToastContainer position="top-right" autoClose={4000}></ToastContainer>
      <Footer />
    </div>
  );
};

export default Register;
