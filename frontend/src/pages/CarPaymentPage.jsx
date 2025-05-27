import React, { useRef, useState } from "react";
import CarPayment from "../components/CarPayment/CarPayment";
import CarPaymentValidation from "../components/CarPaymentValidation/CarPaymentValidation";
import UserNavbar from "../components/UserNavbar/UserNavbar";
import Footer from "../components/Footer/Footer";
import { CarPaymentCardValidation } from "../components/CarPaymentCardValidation/CarPaymentCardValidation";

const CarPaymentPage = () => {
  const [errores, setErrores] = useState({}); // los errores tienen que estar todos separados porque si no cuando los limpiamos hay inconsistencias

  const [cardErrors, setCardErrors] = useState({});

  const [voucherErrors, setvoucherErrors] = useState("");

  const [choiceErrors, setchoiceErrors] = useState("");

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const numeroTelefonicoRef = useRef(null);
  const dniRef = useRef(null);

  const numeroTarjetaRef = useRef(null);
  const fechaTarjetaRef = useRef(null);
  const nombreTarjetaRef = useRef(null);
  const cvcRef = useRef(null);

  const [dataPayment, setDataPayment] = useState({});

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
      setErrores(() => errores);
    } else {
      setErrores({});
    }
  }

  function pasarDatosTarjeta(datos) {
    // el problema esta en que no se cambia el valor de dataPayment
    console.log(datos); // datos se esta pasando correctamente. tanto para transferencia como para el formulario
    setDataPayment(() => datos);
    console.log(dataPayment);
  }

  function handlerPaymentChoice(choicePayment) {
    if (choicePayment) {
      if (choicePayment == "tarjeta") {
        const cardErrors = CarPaymentCardValidation({ dataPayment });

        if (Object.keys(cardErrors).length > 0) {
          if (cardErrors.numeroTarjeta && numeroTarjetaRef.current) {
            numeroTarjetaRef.current.focus();
          }
          if (cardErrors.fechaTarjeta && fechaTarjetaRef.current) {
            fechaTarjetaRef.current.focus();
          }
          if (cardErrors.nombreTarjeta && nombreTarjetaRef.current) {
            nombreTarjetaRef.current.focus();
          }
          if (cardErrors.cvc && cvcRef.current) {
            cvcRef.current.focus();
          }

          setchoiceErrors("");

          setvoucherErrors("");

          setCardErrors(cardErrors);
        } else {
          setCardErrors({});

          // aca iria un  reactToatify
        }
      } else if (choicePayment == "transferencia") {
        if (Object.keys(dataPayment).length == 0) {
          setchoiceErrors("");

          setCardErrors({});

          setvoucherErrors(
            "* debe ingresar el comprobante de pago para poder efectuar el pago"
          );
        } else {
          setvoucherErrors(() => "");

          setchoiceErrors("");

          setCardErrors({});
          // aca iria un reactToastify
        }
      }
    } else {
      setvoucherErrors("");

      setCardErrors({});

      setchoiceErrors("* elija un metodo de pago para poder pagar");
    }
  }

  return (
    <div>
      <UserNavbar />
      <CarPayment
        onSubmit={handlerSubmit}
        onChoice={handlerPaymentChoice}
        onDataPayment={pasarDatosTarjeta}
        errores={errores}
        cardErrors={cardErrors}
        voucherErrors={voucherErrors}
        choiceErrors={choiceErrors}
        refs={{ nombreRef, apellidoRef, numeroTelefonicoRef, dniRef }}
      />
    </div>
  );
};

export default CarPaymentPage;
