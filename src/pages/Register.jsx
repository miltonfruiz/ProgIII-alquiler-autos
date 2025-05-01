import React, { useRef, useState } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import RegisterValidation from "../components/RegisterValidation/RegisterValidation";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nameRegister = useRef(null);
  const lastNameRegister = useRef(null);
  const emailRegister = useRef(null);
  const passwordRegister = useRef(null);
  const verifyPasswordRegister = useRef(null);
  const dniRegister = useRef(null);
  const nacimientoRegister = useRef(null);
  const licenciaRegister = useRef(null);
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
      const asignadoFocus = (error) => {
        if (erroresRegister.error && `${error}Register`.current) {
          `${error}Register`.current.focus();
        }
      };

      for (const error of arrayErrores) {
        asignadoFocus(error);
      }

      setErrores(erroresRegister);
    } else {
      setErrores({});
    }
  };

  return (
    <div>
      <RegisterForm
        onSubmit={handleSubmit}
        errores={errores}
        refs={{
          nameRegister,
          lastNameRegister,
          emailRegister,
          passwordRegister,
          verifyPasswordRegister,
          dniRegister,
          nacimientoRegister,
          licenciaRegister,
        }}
      />
    </div>
  );
};

export default Register;
