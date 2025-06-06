export function userPartialValidation(req, res, next) {
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

  if (correo) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errors.correo = "El correo electrónico no tiene un formato válido.";
    }
  }

  if (contraseña) {
    if (contraseña.length < 6) {
      errors.contraseña = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (repetirContraseña !== contraseña) {
      errors.repetirContraseña = "Las contraseñas no coinciden.";
    }
  }

  if (dni && !/^\d{7,10}$/.test(dni)) {
    errors.dni = "El DNI debe tener entre 7 y 10 dígitos.";
  }

  if (nacimiento && isNaN(Date.parse(nacimiento))) {
    errors.nacimiento = "La fecha de nacimiento no es válida.";
  }

  if (numeroTelefonico && !/^\d{10}$/.test(numeroTelefonico)) {
    errors.numeroTelefonico = "Debe tener 10 dígitos.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}
