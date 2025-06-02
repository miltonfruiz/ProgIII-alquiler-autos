export const UsersValidationAdmin = (user) => {
  const errors = {};
  if (!user.nombre.trim()) errors.nombre = "El nombre es obligatorio";
  if (!user.apellido.trim()) errors.apellido = "El apellido es obligatorio";
  if (!user.correo.trim()) {
    errors.correo = "El correo es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.correo)) {
    errors.correo = "Correo inválido";
  }
  if (!user.contraseña.trim())
    errors.contraseña = "La contraseña es obligatoria";
  if (!user.repetirContraseña.trim()) {
    errors.repetirContraseña = "Debe repetir la contraseña";
  } else if (user.contraseña !== user.repetirContraseña) {
    errors.repetirContraseña = "Las contraseñas no coinciden";
  }
  if (!user.dni.trim()) errors.dni = "El DNI es obligatorio";
  if (!user.nacimiento)
    errors.nacimiento = "La fecha de nacimiento es obligatoria";
  if (!user.licencia.trim()) errors.licencia = "La licencia es obligatoria";
  if (
    !user.rol ||
    !["usuario", "empleado", "administrador"].includes(user.rol)
  ) {
    errors.rol = "Seleccione un rol válido";
  }
  return errors;
};
