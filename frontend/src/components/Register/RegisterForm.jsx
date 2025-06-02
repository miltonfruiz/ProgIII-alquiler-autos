import React from "react";
import { useState } from "react";
import { dataForm } from "./dataRegister";
import "./RegisterForm.css";

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
                <div>
                  <data.icono id="icono" />
                  <label className="labelRegister">{data.label}</label>
                </div>
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
          <button className="buttonRegister">Registrarse</button>
          <p className="tienesCuenta">
            ¿Ya tienes una cuenta? <a href="/">Iniciar seccion</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
