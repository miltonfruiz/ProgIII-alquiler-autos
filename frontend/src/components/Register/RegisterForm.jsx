import React from "react";
import { useState } from "react";
import { dataForm } from "./dataRegister";
import "./RegisterForm.css";
import { FiLogIn } from "react-icons/fi";

const RegisterForm = ({ onSubmit, errores, refs }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    dni: "",
    nacimiento: "",
    licencia: "",
    numeroTelefonico: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="container">
      <form className="formRegister" action="" onSubmit={handleSubmit}>
        <h1 className="titleRegister">Registrarse</h1>
        <div className="gridRegister">
          {dataForm.map((data, index) => {
            return (
              <div className="containerLabelInput" key={index}>
                <label className="labelRegister">
                  <data.icono id="icono" size={13} /> {data.label}
                </label>
                <input
                  className="inputRegister"
                  placeholder={data.placeholder}
                  name={data.name}
                  type={data.type}
                  onChange={handleChange}
                  ref={refs.useRefs[`${data.name}Register`]}
                />
                {errores[data.name] && (
                  <p className="error-message visible">{errores[data.name]}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="divButton">
          <button className="buttonRegister">
            <FiLogIn size={14} /> Registrarse
          </button>
        </div>
        <p className="tienesCuenta">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
