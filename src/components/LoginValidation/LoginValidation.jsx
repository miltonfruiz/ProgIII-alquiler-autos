const LoginValidation = ({ datos }) => {
  const errores = {};
  const email = datos.email?.trim() || "";
  const password = datos.password?.trim() || "";

  if (!email) {
    errores.email = "* Debe ingresar email";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errores.email = "* El email no es válido";
  }
  if (!password) {
    errores.password = "* Debe ingresar contraseña";
  } else if (password.length < 6) {
    errores.password = "* La contraseña debe tener al menos 6 caracteres";
  }
  return errores;
};

export default LoginValidation;
