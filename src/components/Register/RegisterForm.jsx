import React from "react";
import { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.values });
  }

  return (
    <div>
      <form action="">
        <label>Ingrese su nombre:</label>
        <input name="name" type="text" onChange={handleChange} />

        <label>Ingrese su apellido:</label>
        <input name="lastName" type="text" onChange={handleChange} />

        <label>Ingrese su email:</label>
        <input name="email" type="email" onChange={handleChange} />

        <label>Ingrese su contraseña:</label>
        <input name="password" type="password" onChange={handleChange} />

        <label>Ingrese de nuevo su contraseña:</label>
        <input name="verifyPassword" type="password" onChange={handleChange} />
      </form>
    </div>
  );
};

export default RegisterForm;
