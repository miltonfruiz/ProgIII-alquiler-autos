export const CarPaymentValidation = ({
  datosFacturacion,
  datosPago,
  choicePayment,
  checkbox,
}) => {
  const errores = {};

  if (!datosFacturacion.nombre.trim()) {
    errores.nombre = "* Debe ingresar nombre";
  }

  if (!datosFacturacion.apellido.trim()) {
    errores.apellido = "* Debe ingresar apellido";
  }

  if (!datosFacturacion.numeroTelefonico?.trim()) {
    errores.numeroTelefonico = "* debe ingresar su numero telefonico";
  } else if (datosFacturacion.numeroTelefonico.length != 10) {
    errores.numeroTelefonico = "* el numero de telefono debe tener 10 digitos";
  }

  if (!datosFacturacion.dni.trim()) {
    errores.dni = "* Debe ingresar dni";
  } else if (!/^(?![0]+$)[0-9]{6,8}$/.test(datosFacturacion.dni)) {
    errores.dni =
      "* el dni debe tener entre 6 y 8 caracteres y no puede tener letras ni espacios";
  }

  if (!choicePayment) {
    errores.errorEleccion = "* elija un metodo de pago para efectuar el pago";
  }

  if (choicePayment == "tarjeta") {
    if (!datosPago.numeroTarjeta?.trim()) {
      errores.numeroTarjeta = "* ingrese el numero de la tarjeta ";
    } else if (
      datosPago.numeroTarjeta.length < 14 ||
      datosPago.numeroTarjeta.length > 16
    ) {
      errores.numeroTarjeta =
        "* el número de la tarjeta debe tener entre 14 y 16 dígitos";
    }

    if (!datosPago.fechaTarjeta?.trim()) {
      errores.fechaTarjeta = "* ingrese la fecha de expiracion";
    } else {
      const hoy = new Date();
      const fechaExp = new Date(datosPago.fechaTarjeta);
      if (fechaExp < hoy) {
        errores.fechaTarjeta =
          "* la fecha de expiración no puede ser anterior al día de hoy";
      }
    }

    if (!datosPago.nombreTarjeta?.trim()) {
      errores.nombreTarjeta = "* ingrese el nombre del titular de la tarjeta ";
    }

    if (!datosPago.cvc?.trim()) {
      errores.cvc = "* ingrese el codigo de seguridad de la tarjeta";
    } else if (datosPago.cvc.length < 3 || datosPago.cvc.length > 4) {
      errores.cvc = "* el cvc de la tarjeta debe tener 3 o 4 dígitos";
    }
  } else if (choicePayment == "transferencia") {
    if (!datosPago) {
      errores.comprobante = "* debe ingresar el comprobante de pago";
    }
  }

  if (!checkbox) {
    errores.checkbox = "* debe aceptar los terminos y condiciones";
  }

  return errores;
};

export default CarPaymentValidation;
