import React, { useRef, useState, useEffect } from "react";
import CarPayment from "../components/CarPayment/CarPayment";
import CarPaymentValidation from "../components/CarPaymentValidation/CarPaymentValidation";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";
import { CiNoWaitingSign } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
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

  function handlerSubmit(
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

      setErrores(errores);
    } else {
      const carId = JSON.parse(localStorage.getItem("datosAlquiler"))?.auto.id;
      const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;
      const id_reserva = parseInt(localStorage.getItem("contadorReservas"));

      console.log(typeof carId);
      console.log(typeof userId);
      console.log(typeof id_reserva);

      if (choicePayment == "tarjeta") {
        datosPagoCompleto = {
          carId: carId,
          userId: userId,
          id_reserva: id_reserva,
          cardType: tipoTarjeta,
          paymentMethod: choicePayment,
          cardNumber: datosPago.numeroTarjeta,
          expirationDate: datosPago.fechaTarjeta,
          ownerName: datosPago.nombreTarjeta,
          cvc: datosPago.cvc,
          voucher: null,
          acceptableTerms: checkbox,
        };
      } else if (choicePayment == "transferencia") {
        const file = String(datosPago.name);
        datosPagoCompleto = {
          carId: carId,
          userId: userId,
          id_reserva: id_reserva,
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

      fetch(`http://localhost:3000/pays`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPagoCompleto),
      })
        .then((respuesta) => {
          console.log("Respuesta del servidor:", respuesta);
          if (respuesta.ok) {
            console.log("Pago realizado correctamente");
          } else {
            console.log("Error al realizar el pago");
            toast.error("Error al realizar el pago");
          }
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
          toast.error("Error al enviar el formulario");
        });

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
