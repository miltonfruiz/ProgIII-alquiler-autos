export default function PasswordResetValidation(form) {
  const errors = {};
  if (!form.correo) {
    errors.correo = "* Debe ingresar correo";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
    errors.correo = "Correo inválido.";
  }
  if (!form.nuevaContraseña) {
    errors.nuevaContraseña = "* Debe ingresar nueva contraseña";
  } else if (form.nuevaContraseña.length < 6) {
    errors.nuevaContraseña = "Debe tener al menos 6 caracteres.";
  }
  if (!form.repetirContraseña) {
    errors.repetirContraseña = "* Debes repetir la contraseña.";
  } else if (form.nuevaContraseña !== form.repetirContraseña) {
    errors.repetirContraseña = "* Las contraseñas no coinciden.";
  }

  return errors;
}
