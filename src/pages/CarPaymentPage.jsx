import React, { useRef, useState } from "react";
import CarPayment from "../components/CarPayment/CarPayment";
import CarPaymentValidation from "../components/CarPaymentValidation/CarPaymentValidation";

const CarPaymentPage = () => {
  const [errores, setErrores] = useState({});
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const numeroTelefonicoRef = useRef(null);
  const dniRef = useRef(null);

  function handlerSubmit(datosFacturacion) {
    const errores = CarPaymentValidation({ datosFacturacion });

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

      setErrores(errores);
    } else {
      setErrores({});
    }
  }

  return (
    <div>
      <CarPayment
        onSubmit={handlerSubmit}
        errores={errores}
        refs={{ nombreRef, apellidoRef, numeroTelefonicoRef, dniRef }}
      />
    </div>
  );
};

export default CarPaymentPage;
