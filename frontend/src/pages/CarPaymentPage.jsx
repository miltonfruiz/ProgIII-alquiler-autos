import React, { useRef, useState, useEffect } from "react";
import CarPayment from "../components/CarPayment/CarPayment";
import CarPaymentValidation from "../components/CarPaymentValidation/CarPaymentValidation";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";
import { CiNoWaitingSign } from "react-icons/ci";

const CarPaymentPage = () => {
  const [errores, setErrores] = useState({});

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const numeroTelefonicoRef = useRef(null);
  const dniRef = useRef(null);

  const errorEleccionRef = useRef(null);
  const numeroTarjetaRef = useRef(null);
  const fechaTarjetaRef = useRef(null);
  const nombreTarjetaRef = useRef(null);
  const cvcRef = useRef(null);
  const comprobanteRef = useRef(null);

  function handlerSubmit(datosFacturacion, datosPago, choicePayment) {
    console.log(datosFacturacion);
    console.log(datosPago);
    console.log(choicePayment);
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
          nombreRef,
          apellidoRef,
          numeroTelefonicoRef,
          dniRef,
          errorEleccionRef,
          numeroTarjetaRef,
          fechaTarjetaRef,
          nombreTarjetaRef,
          cvcRef,
          comprobanteRef,
        }}
      />
    </div>
  );
};

export default CarPaymentPage;
