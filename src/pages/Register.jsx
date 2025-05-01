import React, { useRef, useState } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import RegisterValidation from "../components/RegisterValidation/RegisterValidation";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const useRefs = useRef({
    nameRegister: null,
    lastNameRegister: null,
    emailRegister: null,
    passwordRegister: null,
    verifyPasswordRegister: null,
    dniRegister: null,
    nacimientoRegister: null,
    licenciaRegister: null,
  });

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
      arrayErrores.map((index, error) => {
        if (error in erroresRegister && useRefs[index].current) {
          useRefs[index].current.focus();
        }
      });

      setErrores(erroresRegister);
      console.log(errores);
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
          useRefs,
        }}
      />
    </div>
  );
};

export default Register;
