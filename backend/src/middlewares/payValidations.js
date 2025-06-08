export function payValidation(req, res, next) {
  const {
    userId,
    carId,
    reservationId,
    cardType,
    paymentMethod,
    cardNumber,
    expirationDate,
    ownerName,
    cvc,
    voucher,
    acceptableTerms,
  } = req.body;

  const errores = {};

  if (!cardType) {
    errores.cardType = "* seleccione el tipo de tarjeta";
  }

  if (!paymentMethod) {
    errores.paymentMethod = "* elija un metodo de pago para poder pagar";
  }

  if (paymentMethod == "tarjeta") {
    if (!cardNumber) {
      errores.cardNumber =
        "* ingrese el numero de la tarjeta para efectuar el pago";
    } else if (cardNumber.length < 14 || cardNumber.length > 16) {
      errores.cardNumber =
        "* el número de la tarjeta debe tener entre 14 y 16 dígitos";
    }

    if (!expirationDate) {
      errores.expirationDate =
        "* ingrese la fecha de expiracion de la tarjeta para efectuar el pago";
    } else {
      const hoy = new Date();
      const fechaExp = new Date(expirationDate);
      if (fechaExp < hoy) {
        errores.expirationDate =
          "* la fecha de expiración no puede ser anterior al día de hoy";
      }
    }

    if (!ownerName) {
      errores.ownerName =
        "* ingrese el nombre del titular de la tarjeta para efectuar el pago";
    }

    if (!cvc) {
      errores.cvc =
        "* ingrese el codigo de seguridad de la tarjeta para efectuar el pago";
    } else if (cvc.length < 3 || cvc.length > 4) {
      errores.cvc = "* el cvc de la tarjeta debe tener 3 o 4 dígitos";
    }
  } else if (paymentMethod == "transferencia") {
    if (!voucher) {
      errores.voucher =
        "* debe ingresar el comprobante de pago para poder efectuar el pago";
    }
  }
  if (!acceptableTerms) {
    errores.acceptableTerms = "* marque el terminos y condiciones";
  }

  // Si hay errores, devolverlos
  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
  }

  // Si todo está bien, continuar
  next();
}
