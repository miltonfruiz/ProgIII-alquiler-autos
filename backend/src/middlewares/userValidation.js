export function userValidation(req, res, next) {
  const {
    nombre,
    apellido,
    correo,
    contraseña,
    repetirContraseña,
    dni,
    nacimiento,
    licencia,
    numeroTelefonico,
  } = req.body;
  const errors = {};
  if (!nombre) errors.nombre = "El nombre es obligatorio.";
  if (!apellido) errors.apellido = "El apellido es obligatorio.";
  if (!correo) {
    errors.correo = "El correo electrónico es obligatorio.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errors.correo = "El correo electrónico no tiene un formato válido.";
    }
  }
  if (!contraseña) {
    errors.contraseña = "La contraseña es obligatoria.";
  } else if (contraseña.length < 6) {
    errors.contraseña = "La contraseña debe tener al menos 6 caracteres.";
  }
  if (contraseña !== repetirContraseña) {
    errors.repetirContraseña = "Las contraseñas no coinciden.";
  }
  if (!dni) {
    errors.dni = "El DNI es obligatorio.";
  } else if (!/^\d{7,10}$/.test(dni)) {
    errors.dni = "El DNI debe tener entre 7 y 10 dígitos.";
  }
  if (!nacimiento) {
    errors.nacimiento = "La fecha de nacimiento es obligatoria.";
  } else if (isNaN(Date.parse(nacimiento))) {
    errors.nacimiento = "La fecha de nacimiento no es válida.";
  } else {
    const hoy = new Date();
    const fechaNacimiento = new Date(nacimiento);
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
      errors.nacimiento = "Para registrarse debe ser mayor de 18 años";
    }
  }
  if (!licencia) {
    errors.licencia = "La licencia de conducir es obligatoria.";
  }
  if (!numeroTelefonico) {
    errors.numeroTelefonico = "El número telefónico es obligatorio.";
  } else if (!/^\d{10}$/.test(numeroTelefonico)) {
    errors.numeroTelefonico = "Debe tener 10 dígitos.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}
