import React from "react";
import { useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md"; // nombre
import { MdMail } from "react-icons/md"; // mail
import { RiLockPasswordFill } from "react-icons/ri"; // contraseña
import { IoCalendar } from "react-icons/io5"; // fecha nacimiento
import { HiIdentification } from "react-icons/hi2"; // dni
import { TbLicense } from "react-icons/tb"; // licencia
import Header from "../Header/Header";
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
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="container">
      <form className="formRegister" action="" onSubmit={handleSubmit}>
        <h1 className="titleRegister">Registrarse</h1>
        <div className="gridRegister">
          <div>
            <div>
              <MdDriveFileRenameOutline id="icono"></MdDriveFileRenameOutline>
              <label className="labelRegister">Nombre</label>
            </div>
            <input
              className="inputRegister"
              placeholder="Nombre"
              name="name"
              type="text"
              onChange={handleChange}
              ref={refs.useRefs.nameRegister}
            />
            {errores.name ? (
              <p className={`error-message ${errores.name ? "visible" : ""}`}>
                {errores.name}
              </p>
            ) : null}
          </div>

          <div>
            <MdDriveFileRenameOutline id="icono"></MdDriveFileRenameOutline>
            <label className="labelRegister">Apellido</label>
            <input
              className="inputRegister"
              placeholder="Apellido"
              name="lastName"
              type="text"
              onChange={handleChange}
              ref={refs.useRefs.lastNameRegister}
            />
            {errores.lastName ? (
              <p
                className={`error-message ${errores.lastName ? "visible" : ""}`}
              >
                {errores.lastName}
              </p>
            ) : null}
          </div>

          <div>
            <MdMail id="icono"></MdMail>
            <label className="labelRegister">Correo elecrónico</label>
            <input
              className="inputRegister"
              placeholder="Tunombre@gmail.com"
              name="email"
              type="email"
              onChange={handleChange}
              ref={refs.useRefs.emailRegister}
            />
            {errores.email ? (
              <p className={`error-message ${errores.email ? "visible" : ""}`}>
                {errores.email}
              </p>
            ) : null}
          </div>
          <div>
            <RiLockPasswordFill id="icono"></RiLockPasswordFill>
            <label className="labelRegister">Contraseña</label>
            <input
              className="inputRegister"
              placeholder="Contraseña"
              name="password"
              type="password"
              onChange={handleChange}
              ref={refs.useRefs.passwordRegister}
            />
            {errores.password ? (
              <p
                className={`error-message ${errores.password ? "visible" : ""}`}
              >
                {errores.password}
              </p>
            ) : null}
          </div>
          <div>
            <RiLockPasswordFill id="icono"></RiLockPasswordFill>
            <label className="labelRegister">Repetir contraseña</label>
            <input
              className="inputRegister"
              placeholder="Contraseña"
              name="verifyPassword"
              type="password"
              onChange={handleChange}
              ref={refs.useRefs.verifyPasswordRegister}
            />
            {errores.verifyPassword ? (
              <p
                className={`error-message ${
                  errores.verifyPassword ? "visible" : ""
                }`}
              >
                {errores.verifyPassword}
              </p>
            ) : null}
          </div>

          <div>
            <HiIdentification id="icono"></HiIdentification>
            <label className="labelRegister">DNI</label>
            <input
              className="inputRegister"
              placeholder="4600000"
              name="dni"
              type="text"
              onChange={handleChange}
              ref={refs.useRefs.dniRegister}
            />
            {errores.dni ? (
              <p className={`error-message ${errores.dni ? "visible" : ""}`}>
                {errores.dni}
              </p>
            ) : null}
          </div>

          <div>
            <IoCalendar id="icono"></IoCalendar>
            <label className="labelRegister">Fecha de Nacimiento</label>
            <input
              className="inputRegister"
              placeholder="DD / MM / AAAA"
              name="nacimiento"
              type="date"
              onChange={handleChange}
              ref={refs.useRefs.nacimientoRegister}
            />
            {errores.nacimiento ? (
              <p
                className={`error-message ${
                  errores.nacimiento ? "visible" : ""
                }`}
              >
                {errores.nacimiento}
              </p>
            ) : null}
          </div>

          <div>
            <TbLicense id="icono"></TbLicense>
            <label className="labelRegister">N° De licencia</label>
            <input
              className="inputRegister"
              placeholder="99999999"
              name="licencia"
              type="text"
              onChange={handleChange}
              ref={refs.useRefs.licenciaRegister}
            />
            {errores.licencia ? (
              <p
                className={`error-message ${errores.licencia ? "visible" : ""}`}
              >
                {errores.licencia}
              </p>
            ) : null}
          </div>
        </div>
        <div className="divButton">
          <button className="buttonRegister">Registrarse</button>
          <p className="tienesCuenta">
            ¿Ya tienes una cuenta? <a href="/">Iniciar seccion</a>
          </p>
        </div>
      </form>
      <p className="login-footer">© 2025 Todos los derechos reservados</p>
    </div>
  );
};

export default RegisterForm;
