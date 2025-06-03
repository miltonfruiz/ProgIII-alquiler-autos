export const CarPaymentValidation = ({
  datosFacturacion,
  datosPago,
  choicePayment,
  checkbox,
}) => {
  const errores = {};

  if (!datosFacturacion.nombre.trim()) {
    errores.nombre = "* Debe ingresar nombre";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.name)) {
    errores.nombre = "* Solo se permiten letras";
  }

  if (!datosFacturacion.apellido.trim()) {
    errores.apellido = "* Debe ingresar apellido";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.apellido)) {
    errores.apellido = "* Solo se permiten letras";
  }

  if (!datosFacturacion.numeroTelefonico?.trim()) {
    errores.numeroTelefonico = "* debe ingresar su numero telefonico";
  }

  if (!datosFacturacion.dni.trim()) {
    errores.dni = "* Debe ingresar dni";
  } else if (!/^(?![0]+$)[0-9]{6,8}$/.test(datos.dni)) {
    errores.dni =
      "* el dni debe tener entre 6 y 8 caracteres y no puede tener letras ni espacios";
  }

  if (!choicePayment) {
    errores.errorEleccion = "* elija un metodo de pago para efectuar el pago";
  }

  if (choicePayment == "tarjeta") {
    if (!datosPago.numeroTarjeta?.trim()) {
      errores.numeroTarjeta = "* ingrese el numero de la tarjeta ";
    }

    if (!datosPago.fechaTarjeta?.trim()) {
      errores.fechaTarjeta = "* ingrese la fecha de expiracion de la ";
    }

    if (!datosPago.nombreTarjeta?.trim()) {
      errores.nombreTarjeta = "* ingrese el nombre del titular de la tarjeta ";
    }

    if (!datosPago.cvc?.trim()) {
      errores.cvc = "* ingrese el codigo de seguridad de la tarjeta";
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
