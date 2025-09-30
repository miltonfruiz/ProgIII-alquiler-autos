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

  function handleChangeCheck(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

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
        {/* Checkbox de términos y condiciones */}
        <div className="termsContainer">
          <label className="termsLabel">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChangeCheck}
              className="termsCheckbox"
            />
            <span className="checkmark"></span>
            Acepto los{" "}
            <a href="/terminos" target="_blank" rel="noopener noreferrer">
              Términos y Condiciones
            </a>{" "}
            y la{" "}
            <a href="/privacidad" target="_blank" rel="noopener noreferrer">
              Política de Privacidad
            </a>
          </label>
          {errores.acceptTerms && (
            <p className="error-message visible">{errores.acceptTerms}</p>
          )}
        </div>
        <div className="divButton">
          <button className="buttonRegister">Registrarse</button>
        </div>
        <p className="tienesCuenta">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
