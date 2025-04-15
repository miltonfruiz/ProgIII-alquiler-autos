import React from "react";

const Validation = ({ datos }) => {
  const errores = {};

  if (!datos.name.trim()) {
    errores.name = "El nombre es obligatorio";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.name)) {
    errores.name = "Solo se permiten letras";
  }

  if (!datos.lastName.trim()) {
    errores.lastName = "El nombre es obligatorio";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.lastName)) {
    errores.lastName = "Solo se permiten letras";
  }

  if (!datos.email.trim()) {
    errores.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(datos.email)) {
    errores.email = "El email no es válido";
  }

  if (!datos.password.trim()) {
    errores.password = "La contraseña es obligatoria";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(datos.password)) {
    errores.password = "Mínimo 8 caracteres, incluyendo letras y números";
  }

  if (!datos.verifyPassword.trim()) {
    errores.verifyPassword = "La contraseña es obligatoria";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(datos.verifyPassword)
  ) {
    errores.verifyPassword = "Mínimo 8 caracteres, incluyendo letras y números";
  }

  if (datos.password != datos.verifyPassword) {
    errores.verifyPassword = "Las contraseñas deben ser iguales";
  }
};

export default Validation;
