import React, { useRef, useState, useEffect } from "react";
import CarPayment from "../components/CarPayment/CarPayment";
import CarPaymentValidation from "../components/CarPaymentValidation/CarPaymentValidation";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";
import { CiNoWaitingSign } from "react-icons/ci";

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

  function handlerSubmit(datosFacturacion, datosPago, choicePayment) {
    const errores = CarPaymentValidation({
      datosFacturacion,
      datosPago,
      choicePayment,
    });

    if (Object.keys(errores).length > 0) {
      if (errores.nombre && nombreRef.current) {
        nombreRef.current.focus();
      }
      if (errores.apellido && apellidoRef.current) {
        apellidoRef.current.focus();
      }
      if (errores.numeroTelefonico && numeroTelefonicoRef.current) {
        numeroTelefonicoRef.current.focus();
      }
      if (errores.dni && dniRef.current) {
        dniRef.current.focus();
      }
      if (errores.errorEleccion && errorEleccionRef.current) {
        errorEleccionRef.current.focus();
      }
      if (errores.numeroTarjeta && numeroTarjetaRef.current) {
        numeroTarjetaRef.current.focus();
      }
      if (errores.fechaTarjeta && fechaTarjetaRef.current) {
        fechaTarjetaRef.current.focus();
      }
      if (errores.nombreTarjeta && nombreTarjetaRef.current) {
        nombreTarjetaRef.current.focus();
      }
      if (errores.cvc && cvcRef.current) {
        cvcRef.current.focus();
      }
      if (errores.comprobante && comprobanteRef.current) {
        comprobanteRef.current.focus();
      }

      setErrores(() => errores);
    } else {
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
    </div>
  );
};

export default CarPaymentPage;
