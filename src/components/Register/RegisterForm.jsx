import React from "react";
import { useState } from "react";

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
          className="imagenAutoRegister"
          src="https://s3-alpha-sig.figma.com/img/d1ab/d407/925ba1de8ebb96f996afb3d06d39aac3?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DCr8hQQY1QJgj1ZGW-YPjU6P6Ls1jYMt~~AzOYOO-GAq2IaQM9QCdBIy4sIaPiVhQWTZwSW72Lx5kytW7VE3M8S~zvlS89wTSCCWEsZcc3WcU4kgiIp-F0RIVz-T9cc8xsVXJuxSBGEDA~e-VgDh0S1n-gKGv1XlqvLzzkjSgE7lEbMI5n4i5YOparI6Pti-v48nwv6NwhkGHxK9Ad7Xfod2mvSKA2HrCWdoPxH9mF~7MnncWCOMIjJchxsP4FXBQp6PdiLEXw~eClqwhcctDkSS7bbDbmi8oJWhb0sR2oywKh9TTD9lpgciBIwP3BDfvgDxL8CjXZtCzamE1RNYxQ__"
          alt=""
        />
        <button className="botonBuscar">
          <img
            className="imagenBuscar"
            src="https://cdn.pixabay.com/photo/2015/12/14/20/35/magnifier-1093183_1280.png"
            alt=""
          />
        </button>
        <input
          className="barraBusqueda"
          type="search"
          placeholder="Buscar algo aqui"
        />
        <img
          className="imagenRegister"
          src="https://cdn.pixabay.com/photo/2017/01/31/16/58/car-2025538_1280.png"
          alt=""
        />
        <img
          className="imagenRegister"
          src="https://cdn.pixabay.com/photo/2022/09/21/02/37/woman-7469274_1280.png"
          alt=""
        />
      </nav>
      <form className="formRegister" action="">
        <h1 className="titleRegister">Registrarse</h1>
        <div className="gridRegister">
          <div>
            <label className="labelRegister">Nombre</label>
            <input
              className="inputRegister"
              placeholder="Nombre"
              name="name"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div>
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
            <label className="labelRegister">Repetir contraseña:</label>
            <input
              className="inputRegister"
              placeholder="Contraseña"
              name="verifyPassword"
              type="password"
              onChange={handleChange}
            />
          </div>

          <div>
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
          <p>
            ya tienes cuenta? <a href="/loginForm">iniciar seccion</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
