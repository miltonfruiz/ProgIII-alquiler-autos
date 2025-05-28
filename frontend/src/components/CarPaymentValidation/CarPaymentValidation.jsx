export const CarPaymentValidation = ({
  datosFacturacion,
  datosPago,
  choicePayment,
}) => {
  const errores = {};

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

  if (!datosFacturacion.dni?.trim()) {
    errores.dni = "* debe ingresar su dni";
  } else if (!/^(?![0]+$)[0-9]{6,8}$/.test(datosFacturacion.dni)) {
    errores.dni = "* ingrese un dni valido";
  }

  if (!choicePayment) {
    errores.errorEleccion = "* elija un metodo de pago para poder pagar";
  }

  if (choicePayment == "tarjeta") {
    if (!datosPago.numeroTarjeta?.trim()) {
      errores.numeroTarjeta =
        "* ingrese el numero de la tarjeta para efectuar el pago";
    }

    if (!datosPago.fechaTarjeta?.trim()) {
      errores.fechaTarjeta =
        "* ingrese la fecha de expiracion de la tarjeta para efectuar el pago";
    }

    if (!datosPago.nombreTarjeta?.trim()) {
      errores.nombreTarjeta =
        "* ingrese el nombre del titular de la tarjeta para efectuar el pago";
    }

    if (!datosPago.cvc?.trim()) {
      errores.cvc =
        "* ingrese el codigo de seguridad de la tarjeta para efectuar el pago";
    }
  } else if (choicePayment == "transferencia") {
    if (!datosPago) {
      errores.comprobante =
        "* debe ingresar el comprobante de pago para poder efectuar el pago";
    }
  }

  return errores;
};

export default CarPaymentValidation;
