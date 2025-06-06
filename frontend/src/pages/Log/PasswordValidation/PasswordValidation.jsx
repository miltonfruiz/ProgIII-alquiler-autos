const PasswordValidation = ({ correo }) => {
  const errors = {};
  if (!correo || !correo.trim()) {
    errors.emailError = "* Debe ingresar correo";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.trim())) {
      errors.emailError = "Correo no válido";
    }
  }
  return errors;
};
export default PasswordValidation;
