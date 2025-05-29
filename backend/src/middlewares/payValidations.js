export function payValidation(req, res, next) {
  const {
    userId,
    carId,
    reservationId,
    subtotal,
    tax,
    total,
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
    }

    if (!expirationDate) {
      errores.expirationDate =
        "* ingrese la fecha de expiracion de la tarjeta para efectuar el pago";
    }

    if (!ownerName) {
      errores.ownerName =
        "* ingrese el nombre del titular de la tarjeta para efectuar el pago";
    }

    if (!cvc) {
      errores.cvc =
        "* ingrese el codigo de seguridad de la tarjeta para efectuar el pago";
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
}
