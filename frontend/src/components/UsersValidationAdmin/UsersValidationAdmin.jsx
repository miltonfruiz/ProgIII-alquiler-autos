export const UsersValidationAdmin = (user) => {
  const errors = {};
  if (!user.nombre.trim()) errors.nombre = "* Debe ingresar nombre";
  if (!user.apellido.trim()) errors.apellido = "* Debe ingresar apellido";
  if (!user.correo.trim()) {
    errors.correo = "* Debe ingresar correo";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.correo)) {
    errors.correo = "Correo inválido";
  }
  if (!user.contraseña.trim()) errors.contraseña = "* Debe ingresar contraseña";
  if (!user.repetirContraseña.trim()) {
    errors.repetirContraseña = "* Debe repetir la contraseña";
  } else if (user.contraseña !== user.repetirContraseña) {
    errors.repetirContraseña = "Las contraseñas no coinciden";
  }
  if (!user.dni.trim()) errors.dni = "* Debe ingresar DNI";
  if (!user.nacimiento)
    errors.nacimiento = "* Debe ingresar fecha de nacimiento";
  if (!user.licencia.trim()) errors.licencia = "* Debe ingresar licencia";
  if (
    !user.rol ||
    !["usuario", "empleado", "administrador"].includes(user.rol)
  ) {
    errors.rol = "Seleccione un rol válido";
  }
  if (!user.numeroTelefonico.trim()) {
    errors.numeroTelefonico = "* Debe ingresar número telefónico";
  } else if (!/^\d{10}$/.test(user.numeroTelefonico)) {
    errors.numeroTelefonico = "Debe tener 10 dígitos.";
  }

  return errors;
};
