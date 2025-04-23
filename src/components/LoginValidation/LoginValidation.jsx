const LoginValidation = ({ datos }) => {
  const errores = {};
  if (!datos.email.trim()) {
    errores.email = "* Debe ingresar email";
  } else if (!/\S+@\S+\.\S+/.test(datos.email)) {
    errores.email = "* El email no es válido";
  }
  if (!datos.password.trim()) {
    errores.password = "* Debe ingresar contraseña";
  } else if (datos.password.length < 6) {
    errores.password = "* La contraseña debe tener al menos 6 caracteres";
  }
  return errores;
};
export default LoginValidation;
