import React, { useRef, useState } from "react";
import CarPayment from "../components/CarPayment/CarPayment";
import CarPaymentValidation from "../components/CarPaymentValidation/CarPaymentValidation";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";
import { CiNoWaitingSign } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import {
  ObtenerReservas,
  ConfirmarReserva,
  CancelarReserva,
} from "../api/actualizarReservas.js";
import { CrearPago, ObtenerUsuarios } from "../api/crearPagos.js";

const datosAlquiler = JSON.parse(localStorage.getItem("datosAlquiler"));

// import { useDataContext } from "./Contexts/Contexts";

const CarPaymentPage = () => {
  const [errores, setErrores] = useState({});

  // const { estadoIds, setEstadoIds } = useDataContext();

  const useRefs = {
    nombreRef: useRef(null),
    apellidoRef: useRef(null),
    numeroTelefonicoRef: useRef(null),
    dniRef: useRef(null),
    errorEleccionRef: useRef(null),
    numeroTarjetaRef: useRef(null),
    fechaTarjetaRef: useRef(null),
    nombreTarjetaRef: useRef(null),
    cvcRef: useRef(null),
    comprobanteRef: useRef(null),
  };

  const arrayErrores = [
    "nombre",
    "apellido",
    "numeroTelefonico",
    "dni",
    "errorEleccion",
    "numeroTarjeta",
    "fechaTarjeta",
    "nombreTarjeta",
    "cvc",
    "comprobante",
  ];

  let datosPagoCompleto = {};

  async function handlerSubmit(
    datosFacturacion,
    datosPago,
    choicePayment,
    checkbox,
    tipoTarjeta
  ) {
    const errores = CarPaymentValidation({
      datosFacturacion,
      datosPago,
      choicePayment,
      checkbox,
    });

    if (Object.keys(errores).length > 0) {
      arrayErrores.forEach((error) => {
        const keyRef = `${error}Ref`;
        if (errores[error] && useRefs[keyRef].current) {
          useRefs[keyRef].current.focus();
        }
      });

      const reservas = await ObtenerReservas();
      CancelarReserva(reservas);

      setErrores(errores);
    } else {
      const reservas = await ObtenerReservas();

      ConfirmarReserva(reservas);
      const ultimaReserva = reservas[reservas.length - 1];

      console.log("ultima reserva", ultimaReserva);
      console.log("id auto de la ultima reserva", ultimaReserva.carId);
      console.log("id usuario de la ultima reserva", ultimaReserva.userId);

      const idAutoReserva = ultimaReserva.carId;
      const idUsuarioReserva = ultimaReserva.userId;
      const idUltimaReserva = ultimaReserva.id_reserva;

      console.log("datos alquiler subtotal", datosAlquiler.total);
      console.log("datos alquiler total", datosAlquiler.totalFinal);

      if (choicePayment == "tarjeta") {
        datosPagoCompleto = {
          carId: idAutoReserva,
          userId: idUsuarioReserva,
          id_reserva: idUltimaReserva,
          subtotal: datosAlquiler.total,
          tax: datosAlquiler.tax,
          total: datosAlquiler.totalFinal,
          cardType: tipoTarjeta,
          paymentMethod: choicePayment,
          cardNumber: datosPago.numeroTarjeta,
          expirationDate: datosPago.fechaTarjeta,
          ownerName: datosPago.nombreTarjeta,
          cvc: datosPago.cvc,
          voucher: null,
          acceptableTerms: checkbox,
        };
        CrearPago(datosPagoCompleto);
      } else if (choicePayment == "transferencia") {
        const file = String(datosPago.name);
        datosPagoCompleto = {
          carId: idAutoReserva,
          userId: idUsuarioReserva,
          id_reserva: idUltimaReserva,
          subtotal: datosAlquiler.total,
          tax: datosAlquiler.tax,
          total: datosAlquiler.totalFinal,
          cardType: null,
          paymentMethod: choicePayment,
          cardNumber: null,
          expirationDate: null,
          ownerName: null,
          cvc: null,
          voucher: file,
          acceptableTerms: checkbox,
        };
        CrearPago(datosPagoCompleto);
      }

      console.log(datosPagoCompleto);

      toast.success("¡auto rentado!");
      setErrores({});
    }
  }

  return (
    <div>
      <UserNavbar />
      <CarPayment
        onSubmit={handlerSubmit}
        errores={errores}
        refs={{
          useRefs,
        }}
      />
      <ToastContainer position="top-right" autoClose={4000}></ToastContainer>
    </div>
  );
};

export default CarPaymentPage;
