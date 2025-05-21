const CarPaymentValidation = ({ datosFacturacion }) => {
  errores = {};

  if (!datosFacturacion.nombre?.trim()) {
    errores.nombre = "* debe ingresar el nombre";
  }

  if (!datosFacturacion.apellido?.trim()) {
    errores.apellido = "* debe ingresar el apellido";
  }

  if (!datosFacturacion.numeroTelefonico?.trim()) {
    errores.numeroTelefonico = "* debe ingresar su numero telefonico";
  } else if (
    /!^(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,3}\)?[-.\s]?)?\d{4,}[-.\s]?\d{4}$/.test(
      datosFacturacion.numeroTelefonico
    )
  ) {
    errores.numeroTelefonico = "* ingrese un numero valido";
  }

  if (!datosFacturacion?.dni.trim()) {
    errores.dni = "* debe ingresar su dni";
  } else if (!/^(?![0]+$)[0-9]{6,8}$/.test(datos.dni)) {
    errores.dni = "* ingrese un dni valido";
  }

  return errores;
};

export default CarPaymentValidation;
