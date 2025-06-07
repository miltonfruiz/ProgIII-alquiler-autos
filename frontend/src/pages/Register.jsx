import React, { useRef, useState } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import RegisterValidation from "../components/RegisterValidation/RegisterValidation";
import { toast } from "react-toastify";
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
      const formBackend = {
        nombre: formRegister.name,
        apellido: formRegister.lastName,
        correo: formRegister.email,
        contraseña: formRegister.password,
        repetirContraseña: formRegister.verifyPassword,
        dni: formRegister.dni,
        nacimiento: formRegister.nacimiento,
        licencia: formRegister.licencia,
        numeroTelefonico: formRegister.numeroTelefonico,
      };
      try {
        const res = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formBackend),
        });
        const data = await res.json();
        if (!res.ok) {
          console.log("Error del servidor:", data.error || data.errors);
          toast.error(data.error || "Error al registrar el usuario.");
          return;
        }
        toast.success("¡Usuario registrado correctamente!");
        setErrores({});
        setRegisterIn(true);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        toast.error("Error del servidor.");
      }
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
