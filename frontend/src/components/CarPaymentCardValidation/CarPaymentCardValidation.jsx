export function CarPaymentCardValidation({ dataPayment }) {
  const cardErrors = {};

  if (!dataPayment.numeroTarjeta?.trim()) {
    cardErrors.numeroTarjeta =
      "* ingrese el numero de la tarjeta para efectuar el pago";
  }

  if (!dataPayment.fechaTarjeta?.trim()) {
    cardErrors.fechaTarjeta =
      "* ingrese la fecha de expiracion de la tarjeta para efectuar el pago";
  }

  if (!dataPayment.nombreTarjeta?.trim()) {
    cardErrors.nombreTarjeta =
      "* ingrese el nombre del titular de la tarjeta para efectuar el pago";
  }

  if (!dataPayment.cvc?.trim()) {
    cardErrors.cvc =
      "* ingrese el codigo de seguridad de la tarjeta para efectuar el pago";
  }

  return cardErrors;
}
