import React, { useRef, useState } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import RegisterValidation from "../components/RegisterValidation/RegisterValidation";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

  const handleSubmit = (formRegister) => {
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
      toast.success("¡Usuario registrado correctamente!");
      setErrores({});
      setTimeout(() => {
        navigate("/testhome");
      }, 3000);
    }
  };

  return (
    <div>
      <RegisterForm
        onSubmit={handleSubmit}
        errores={errores}
        refs={{
          useRefs,
        }}
      />
      <ToastContainer position="top-right" autoClose={4000}></ToastContainer>
    </div>
  );
};

export default Register;
