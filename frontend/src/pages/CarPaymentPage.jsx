import React, { useRef, useState, useEffect } from "react";
import CarPayment from "../components/CarPayment/CarPayment";
import CarPaymentValidation from "../components/CarPaymentValidation/CarPaymentValidation";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";
import { CiNoWaitingSign } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";

const CarPaymentPage = () => {
  const [errores, setErrores] = useState({});

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
      fetch("http://localhost:3000/pays", {
        method: "POST",
        body: JSON.stringify({
          tipoTarjeta,
          choicePayment,
          ...datosPago,
          checkbox,
        }),
      })
        .then((respuesta) => {
          if (respuesta.ok) {
            console.log("Pago realizado correctamente");
          } else {
            console.log("Error al realizar el pago");
          }
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
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
