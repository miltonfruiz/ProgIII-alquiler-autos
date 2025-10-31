import React, { useRef, useState, useEffect } from "react";
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
import { CrearPago, ObtenerAutos, ObtenerUsuarios } from "../api/crearPagos.js";

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
      const autos = await ObtenerAutos();
      const usuarios = await ObtenerUsuarios();
      ConfirmarReserva(reservas);
      const ultimaReserva = reservas[reservas.length - 1];
      const ultimoAuto = autos[autos.length - 1];
      const ultimoUsuario = usuarios[usuarios.length - 1];
      const idUltimoAuto = ultimoAuto.id;
      const idUltimoUsuario = ultimoUsuario.id;
      const idUltimaReserva = ultimaReserva.id_reserva;

      if (choicePayment == "tarjeta") {
        datosPagoCompleto = {
          carId: idUltimoAuto,
          userId: idUltimoUsuario,
          id_reserva: idUltimaReserva,
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
          carId: idUltimoAuto,
          userId: idUltimoUsuario,
          id_reserva: idUltimaReserva,
          cardType: null,
          paymentMethod: choicePayment,
          cardNumber: null,
          expirationDate: null,
          ownerName: null,
          cvc: null,
          voucher: file,
          acceptableTerms: checkbox,
        };
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
