import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { IoCard } from "react-icons/io5";

export const objetosFormPersona = [
  {
    label: "Nombre",
    placeholder: "Tu nombre",
    name: "nombre",
  },
  {
    label: "Apellido",
    placeholder: "Tu apellido",
    name: "apellido",
  },
  {
    label: "Telefóno",
    placeholder: "+54 9 11 1234-5678",
    name: "numeroTelefonico",
  },
  {
    label: "DNI",
    placeholder: "42345678",
    name: "dni",
  },
];

export const objetosFormTarjeta = [
  {
    label: "Numero de Tarjeta(sin espacios)",
    type: "text",
    name: "numeroTarjeta",
  },
  {
    label: "Fecha de expiración",
    type: "date",
    name: "fechaTarjeta",
  },
  {
    label: "Nombre del titular",
    type: "text",
    name: "nombreTarjeta",
  },
  {
    label: "CVC",
    type: "text",
    name: "cvc",
  },
];

export const objetosItems = [
  {
    titulo: "🛡️ Seguro del auto",
    primerItem: "Todos los autos incluyen un seguro contra terceros.",
    segundoItem:
      "El seguro no cubre daños ocacionados por negligencia del conductor.",
  },
  {
    titulo: "🕒 Entrega y Devolucion",
    primerItem: "El auto debe devolverse con el mismo nivel de combustible.",
    segundoItem: "Hay una hora de tolerancia para la devolucion.",
  },
  {
    titulo: "📍 Requisitos al retirar",
    primerItem: "Presentar dni y licencia de conducir vigente.",
    segundoItem: "Ser mayor de 21 años.",
  },
];

export const objetosTarjetas = [
  {
    nombre: "Visa",
    value: "visa",
  },
  {
    nombre: "Mastercard",
    value: "mastercard",
  },
  {
    nombre: "American express",
    value: "american",
  },
  {
    nombre: "Tarjeta de debito",
    value: "debito",
  },
];
