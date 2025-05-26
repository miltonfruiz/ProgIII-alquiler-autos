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
  if (!repetirContraseña) {
    errors.repetirContraseña = "Debe repetir la contraseña.";
  } else if (contraseña !== repetirContraseña) {
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
  }
  if (!licencia) {
    errors.licencia = "La licencia de conducir es obligatoria.";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}
