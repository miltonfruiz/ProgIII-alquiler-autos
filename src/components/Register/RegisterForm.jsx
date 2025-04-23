import React from "react";
import { useState } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md"; // nombre
import { MdMail } from "react-icons/md"; // mail
import { RiLockPasswordFill } from "react-icons/ri"; // contraseña
import { IoCalendar } from "react-icons/io5"; // fecha nacimiento
import { HiIdentification } from "react-icons/hi2"; // dni
import { TbLicense } from "react-icons/tb"; // licencia
import { IoSearchOutline } from "react-icons/io5"; // buscador
import { BiCar } from "react-icons/bi"; // auto
import { LuUserRound } from "react-icons/lu"; // persona
import { VscSettings } from "react-icons/vsc"; // settings

const RegisterForm = () => {
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
    setFormData({ ...formData, [e.target.name]: e.target.values });
  }

  return (
    <div className="container">
      <nav className="navRegister">
        <img
          className="autoHeader"
          src="https://s3-alpha-sig.figma.com/img/d1ab/d407/925ba1de8ebb96f996afb3d06d39aac3?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DCr8hQQY1QJgj1ZGW-YPjU6P6Ls1jYMt~~AzOYOO-GAq2IaQM9QCdBIy4sIaPiVhQWTZwSW72Lx5kytW7VE3M8S~zvlS89wTSCCWEsZcc3WcU4kgiIp-F0RIVz-T9cc8xsVXJuxSBGEDA~e-VgDh0S1n-gKGv1XlqvLzzkjSgE7lEbMI5n4i5YOparI6Pti-v48nwv6NwhkGHxK9Ad7Xfod2mvSKA2HrCWdoPxH9mF~7MnncWCOMIjJchxsP4FXBQp6PdiLEXw~eClqwhcctDkSS7bbDbmi8oJWhb0sR2oywKh9TTD9lpgciBIwP3BDfvgDxL8CjXZtCzamE1RNYxQ__"
          alt=""
        />
        <div className="divBusqueda">
          <button className="botonBuscar">
            <IoSearchOutline className="imagenBuscar"></IoSearchOutline>
          </button>
          <input
            className="barraBusqueda"
            type="search"
            placeholder="Buscar algo aqui"
          />
          <button className="botonSettings">
            <VscSettings className="settings"></VscSettings>
          </button>
        </div>

        <BiCar className="imagenAuto"></BiCar>
        <LuUserRound className="imagenPersona"></LuUserRound>
      </nav>
      <form className="formRegister" action="">
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
            />
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
            />
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
            />
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
            />
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
            />
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
            />
          </div>

          <div>
            <IoCalendar id="icono"></IoCalendar>
            <label className="labelRegister">Fecha de Nacimiento</label>
            <input
              className="inputRegister"
              placeholder="DD / MM / AAAA"
              name="Nacimiento"
              type="date"
              onChange={handleChange}
            />
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
            />
          </div>
        </div>
        <div className="divButton">
          <button className="buttonRegister">Registrarse</button>
          <p className="tienesCuenta">
            ¿Ya tienes una cuenta? <a href="/loginForm">Iniciar seccion</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
