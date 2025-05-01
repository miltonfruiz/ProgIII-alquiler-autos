const RegisterValidation = ({ datos }) => {
  const errores = {};

  console.log(datos);

  if (!datos.name.trim()) {
    errores.name = "* Debe ingresar nombre";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.name)) {
    errores.name = "* Solo se permiten letras";
  }

  if (!datos.lastName.trim()) {
    errores.lastName = "* Debe ingresar apellido";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.lastName)) {
    errores.lastName = "* Solo se permiten letras";
  }

  if (!datos.email.trim()) {
    errores.email = "* Debe ingresar email";
  } else if (!/\S+@\S+\.\S+/.test(datos.email)) {
    errores.email = "* El email no es válido";
  }

  if (!datos.password.trim()) {
    errores.password = "* Debe ingresar contraseña";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(datos.password)) {
    errores.password = "* Mínimo 8 caracteres, incluyendo letras y números";
  }

  if (!datos.verifyPassword.trim()) {
    errores.verifyPassword = "* Debe verificar contraseña";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(datos.verifyPassword)
  ) {
    errores.verifyPassword =
      "* Mínimo 8 caracteres, incluyendo letras y números";
  }

  if (datos.password != datos.verifyPassword) {
    errores.verifyPassword = "* Las contraseñas deben ser iguales";
  }

  if (!datos.dni.trim()) {
    errores.dni = "* Debe ingresar dni";
  } else if (!/^(?![0]+$)[0-9]{6,8}$/.test(datos.dni)) {
    errores.dni =
      "* el dni debe tener entre 6 y 8 caracteres y no puede tener letras ni espacios";
  }

  if (!datos.nacimiento.trim()) {
    errores.nacimiento = "* Debe ingresar fecha de nacimiento";
  }

  if (!datos.licencia.trim()) {
    errores.licencia = "Debe ingresar licencia";
  } else if (!/\d/.test(datos.licencia)) {
    errores.licencia =
      "la licencia no puede tener letras ni caracteres especiales";
  }
  return errores;
};

export default RegisterValidation;
